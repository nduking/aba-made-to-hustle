from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from .. import models, schemas, database
from ..utils.security import get_current_user
import os
import urllib.parse
import requests

router = APIRouter(prefix="/calendar", tags=["calendar"])

# Helper to build Google OAuth consent URL
def _build_auth_url(state: str) -> str:
    client_id = os.getenv("GOOGLE_CLIENT_ID")
    redirect_uri = os.getenv("GOOGLE_REDIRECT_URI")
    scope = "https://www.googleapis.com/auth/calendar.events"
    params = {
        "client_id": client_id,
        "redirect_uri": redirect_uri,
        "response_type": "code",
        "scope": scope,
        "access_type": "offline",
        "state": state,
        "prompt": "consent",
    }
    return f"https://accounts.google.com/o/oauth2/v2/auth?{urllib.parse.urlencode(params)}"

@router.get("/auth-url")
def get_auth_url(state: str = Query(..., description="CSRF protection state token")):
    url = _build_auth_url(state)
    return {"auth_url": url}

@router.get("/callback")
def oauth_callback(code: str = Query(...), state: str = Query(...), db: Session = Depends(database.SessionLocal), current_user: models.User = Depends(get_current_user)):
    # Exchange auth code for tokens
    client_id = os.getenv("GOOGLE_CLIENT_ID")
    client_secret = os.getenv("GOOGLE_CLIENT_SECRET")
    redirect_uri = os.getenv("GOOGLE_REDIRECT_URI")
    data = {
        "code": code,
        "client_id": client_id,
        "client_secret": client_secret,
        "redirect_uri": redirect_uri,
        "grant_type": "authorization_code",
    }
    token_resp = requests.post("https://oauth2.googleapis.com/token", data=data)
    if token_resp.status_code != 200:
        raise HTTPException(status_code=400, detail="Failed to exchange code for token")
    tokens = token_resp.json()
    refresh_token = tokens.get("refresh_token")
    if not refresh_token:
        raise HTTPException(status_code=400, detail="No refresh token received")
    # Store refresh token on user
    current_user.google_refresh_token = refresh_token
    db.add(current_user)
    db.commit()
    return {"detail": "Google Calendar linked successfully"}

@router.post("/event")
def create_event(event: schemas.SubscriptionOut, db: Session = Depends(database.SessionLocal), current_user: models.User = Depends(get_current_user)):
    # Reuse existing notification logic
    from ..notifications import create_calendar_event
    # Fetch subscription from DB to ensure full model
    sub = db.query(models.Subscription).filter(models.Subscription.id == event.id, models.Subscription.user_id == current_user.id).first()
    if not sub:
        raise HTTPException(status_code=404, detail="Subscription not found")
    create_calendar_event(current_user, sub)
    return {"detail": "Calendar event created (or .ics fallback)"}
