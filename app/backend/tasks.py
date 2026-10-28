import os
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime, timedelta
from .email_service import IMAPClient, parse_invoice
from . import models, database, notifications
from sqlalchemy.orm import Session
import logging

logger = logging.getLogger(__name__)

scheduler = BackgroundScheduler()

# --- Email sync job ---
def email_sync_job():
    logger.info("Starting email sync job")
    db: Session = database.SessionLocal()
    try:
        users = db.query(models.User).all()
        for user in users:
            client = IMAPClient(host=user.imap_host, username=user.imap_username, password=user.imap_password_encrypted)  # In real app, decrypt password
            try:
                client.connect()
                invoice_ids = client.search_invoices()
                for mail_id in invoice_ids:
                    msg_id, subject, received_at, body = client.fetch_email(mail_id)
                    # Avoid duplicate processing
                    if db.query(models.EmailMessage).filter_by(message_id=msg_id).first():
                        continue
                    data = parse_invoice(body)
                    if not data.get("name") or not data.get("expiry_date"):
                        continue
                    sub = models.Subscription(
                        user_id=user.id,
                        name=data["name"],
                        provider=None,
                        start_date=received_at,
                        expiry_date=data["expiry_date"],
                        priority=models.PriorityEnum.MEDIUM,
                        last_payment_amount=data.get("amount"),
                        notes=subject,
                    )
                    db.add(sub)
                    email_msg = models.EmailMessage(
                        user_id=user.id,
                        message_id=msg_id,
                        subject=subject,
                        received_at=received_at,
                        processed=True,
                    )
                    db.add(email_msg)
                db.commit()
            except Exception as e:
                logger.exception("Error syncing emails for user %s: %s", user.email, e)
            finally:
                client.disconnect()
    finally:
        db.close()
    logger.info("Email sync job finished")

# --- Reminder job ---
def reminder_job():
    logger.info("Starting reminder job")
    db: Session = database.SessionLocal()
    try:
        soon = datetime.utcnow() + timedelta(days=7)
        subs = db.query(models.Subscription).filter(models.Subscription.expiry_date <= soon).all()
        for sub in subs:
            user = db.query(models.User).filter_by(id=sub.user_id).first()
            if not user:
                continue
            # Send email reminder
            notifications.send_email_reminder(user.email, sub)
            # Push notification placeholder
            notifications.send_push_notification(user, sub)
            # Calendar event placeholder
            notifications.create_calendar_event(user, sub)
    finally:
        db.close()
    logger.info("Reminder job finished")

# Schedule jobs
scheduler.add_job(email_sync_job, "interval", minutes=30, id="email_sync", replace_existing=True)
scheduler.add_job(reminder_job, "cron", hour=0, minute=0, id="reminder_daily", replace_existing=True)

scheduler.start()
