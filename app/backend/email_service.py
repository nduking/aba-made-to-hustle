import imaplib
import email
from email.header import decode_header
from datetime import datetime
from typing import List, Tuple
import re
import logging

logger = logging.getLogger(__name__)

class IMAPClient:
    """Simple IMAP client to fetch emails and filter subscription invoices."""

    def __init__(self, host: str, username: str, password: str, mailbox: str = "INBOX"):
        self.host = host
        self.username = username
        self.password = password
        self.mailbox = mailbox
        self.connection = None

    def connect(self):
        self.connection = imaplib.IMAP4_SSL(self.host)
        self.connection.login(self.username, self.password)
        self.connection.select(self.mailbox)
        logger.info("IMAP connected to %s", self.host)

    def disconnect(self):
        if self.connection:
            try:
                self.connection.close()
                self.connection.logout()
            except Exception as e:
                logger.warning("Error during IMAP disconnect: %s", e)

    def search_invoices(self, criteria: str = "ALL") -> List[bytes]:
        """Search for emails that are likely invoices.
        Simple heuristic: look for keywords in subject such as 'invoice', 'receipt', 'payment', 'subscription'."""
        result, data = self.connection.search(None, criteria)
        if result != "OK":
            logger.error("IMAP search failed: %s", result)
            return []
        ids = data[0].split()
        invoice_ids = []
        for mail_id in ids:
            res, msg_data = self.connection.fetch(mail_id, "(RFC822)")
            if res != "OK":
                continue
            raw_email = msg_data[0][1]
            msg = email.message_from_bytes(raw_email)
            subject, encoding = decode_header(msg["Subject"])[0]
            if isinstance(subject, bytes):
                subject = subject.decode(encoding or "utf-8", errors="ignore")
            subject_lower = subject.lower()
            if any(keyword in subject_lower for keyword in ["invoice", "receipt", "payment", "subscription"]):
                invoice_ids.append(mail_id)
        return invoice_ids

    def fetch_email(self, mail_id: bytes) -> Tuple[str, str, datetime, str]:
        """Fetch a single email and return (message_id, subject, received_at, body)."""
        res, msg_data = self.connection.fetch(mail_id, "(RFC822 UID)")
        if res != "OK":
            raise RuntimeError(f"Failed to fetch email {mail_id}")
        raw_email = msg_data[0][1]
        msg = email.message_from_bytes(raw_email)
        message_id = msg.get("Message-ID", "")
        subject, encoding = decode_header(msg["Subject"])[0]
        if isinstance(subject, bytes):
            subject = subject.decode(encoding or "utf-8", errors="ignore")
        date_tuple = email.utils.parsedate_tz(msg["Date"])
        received_at = datetime.fromtimestamp(email.utils.mktime_tz(date_tuple))
        # Get body (prefer plain text)
        body = ""
        if msg.is_multipart():
            for part in msg.walk():
                content_type = part.get_content_type()
                if content_type == "text/plain" and part.get_content_disposition() != "attachment":
                    charset = part.get_content_charset() or "utf-8"
                    body = part.get_payload(decode=True).decode(charset, errors="ignore")
                    break
        else:
            charset = msg.get_content_charset() or "utf-8"
            body = msg.get_payload(decode=True).decode(charset, errors="ignore")
        return message_id, subject, received_at, body

    def logout(self):
        self.disconnect()

# Simple parser using regex to extract subscription details from email body
def parse_invoice(body: str) -> dict:
    """Return a dict with keys: name, amount, expiry_date (optional)."""
    # Very naive patterns – real world would need more robust parsing or AI.
    name_match = re.search(r"(?:Subscription|Service)[:\s]+([^\n\r]+)", body, re.IGNORECASE)
    amount_match = re.search(r"(?:Amount|Total)[:\s]+\$?([0-9,.]+)", body, re.IGNORECASE)
    expiry_match = re.search(r"(?:Expires|Expiry)[:\s]+([A-Za-z]{3,9}\s+\d{1,2},\s+\d{4})", body, re.IGNORECASE)

    result = {}
    if name_match:
        result["name"] = name_match.group(1).strip()
    if amount_match:
        result["amount"] = float(amount_match.group(1).replace(",", ""))
    if expiry_match:
        try:
            result["expiry_date"] = datetime.strptime(expiry_match.group(1).strip(), "%B %d, %Y")
        except ValueError:
            # fallback: ISO format
            try:
                result["expiry_date"] = datetime.fromisoformat(expiry_match.group(1).strip())
            except Exception:
                result["expiry_date"] = None
    return result
