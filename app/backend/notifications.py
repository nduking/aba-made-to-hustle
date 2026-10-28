import logging
from . import models
from typing import Any
from pywebpush import webpush, WebPushException
import os
import json
import requests

logger = logging.getLogger(__name__)

# Load VAPID keys from environment
VAPID_PRIVATE_KEY = os.getenv("VAPID_PRIVATE_KEY")
VAPID_PUBLIC_KEY = os.getenv("VAPID_PUBLIC_KEY")
VAPID_CLAIMS = {
    "sub": "mailto:admin@example.com"
}

def send_email_reminder(to_email: str, subscription: models.Subscription):
    logger.info(f"Sending email reminder to {to_email} for subscription {subscription.name} expiring on {subscription.expiry_date}")
    print(f"Reminder email sent to {to_email} for {subscription.name}")

def send_push_notification(user: models.User, subscription: models.Subscription):
    """Send a web push notification using stored push subscription and VAPID keys."""
    # Retrieve the user's push subscription from DB
    db_sub = (
        models.PushSubscription
        .query
        .filter(models.PushSubscription.user_id == user.id)
        .first()
    )
    if not db_sub:
        logger.warning(f"No push subscription found for user {user.id}")
        return
    payload = json.dumps({
        "title": "Subscription Expiry Reminder",
        "body": f"Your subscription {subscription.name} expires on {subscription.expiry_date.date()}",
        "url": "/subscriptions"
    })
    try:
        webpush(
            subscription_info={
                "endpoint": db_sub.endpoint,
                "keys": {
                    "p256dh": db_sub.keys_p256dh,
                    "auth": db_sub.keys_auth,
                },
            },
            data=payload,
            vapid_private_key=VAPID_PRIVATE_KEY,
            vapid_claims=VAPID_CLAIMS,
        )
        logger.info(f"Push notification sent to user {user.id}")
    except WebPushException as ex:
        logger.error(f"Web push failed: {ex}")

def create_calendar_event(user: models.User, subscription: models.Subscription):
    """Create a calendar event using Google Calendar API if credentials are present, otherwise fallback to .ics file."""
    if user.google_refresh_token:
        # Use Google Calendar API to insert event
        access_token = _refresh_google_token(user.google_refresh_token)
        if not access_token:
            logger.error("Failed to obtain Google access token")
            return
        event = {
            "summary": f"{subscription.name} subscription expires",
            "description": subscription.notes or "",
            "start": {"date": subscription.expiry_date.date().isoformat()},
            "end": {"date": (subscription.expiry_date.date() + __import__('datetime').timedelta(days=1)).isoformat()},
        }
        headers = {"Authorization": f"Bearer {access_token}", "Content-Type": "application/json"}
        calendar_id = "primary"
        response = requests.post(
            f"https://www.googleapis.com/calendar/v3/calendars/{calendar_id}/events",
            headers=headers,
            json=event,
        )
        if response.status_code == 200:
            logger.info(f"Created Google Calendar event for subscription {subscription.id}")
        else:
            logger.error(f"Google Calendar API error: {response.status_code} {response.text}")
    else:
        # Fallback: write .ics file
        from icalendar import Calendar, Event
        cal = Calendar()
        cal.add('prodid', '-//Subscription Tracker//mxm.dk//')
        cal.add('version', '2.0')
        ev = Event()
        ev.add('summary', f"{subscription.name} expires")
        ev.add('dtstart', subscription.expiry_date.date())
        ev.add('dtend', (subscription.expiry_date.date() + __import__('datetime').timedelta(days=1)))
        cal.add_component(ev)
        ics_path = f"./calendar/{subscription.id}.ics"
        with open(ics_path, 'wb') as f:
            f.write(cal.to_ical())
        logger.info(f"Wrote fallback .ics file for subscription {subscription.id} at {ics_path}")

def _refresh_google_token(refresh_token: str) -> str | None:
    """Exchange a refresh token for an access token using client credentials from env."""
    client_id = os.getenv("GOOGLE_CLIENT_ID")
    client_secret = os.getenv("GOOGLE_CLIENT_SECRET")
    if not client_id or not client_secret:
        logger.error("Google client ID/secret not set in environment")
        return None
    data = {
        "client_id": client_id,
        "client_secret": client_secret,
        "refresh_token": refresh_token,
        "grant_type": "refresh_token",
    }
    resp = requests.post("https://oauth2.googleapis.com/token", data=data)
    if resp.status_code == 200:
        return resp.json().get("access_token")
    logger.error(f"Failed to refresh Google token: {resp.status_code} {resp.text}")
    return None
