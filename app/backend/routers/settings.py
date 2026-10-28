from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from .. import models, schemas, database, utils
from ..utils import crypto

router = APIRouter()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/imap", response_model=schemas.UserOut)
def get_imap_settings(current_user: models.User = Depends(lambda db=Depends(get_db): db.query(models.User).filter(models.User.id == db.id).first())):
    # Return IMAP host and username; password not returned for security
    return current_user

@router.put("/imap", response_model=schemas.UserOut)
def update_imap_settings(
    imap_host: str,
    imap_username: str,
    imap_password: str,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(lambda: None)  # placeholder, will be overridden by main dependency
):
    user = db.query(models.User).filter(models.User.id == current_user.id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.imap_host = imap_host
    user.imap_username = imap_username
    user.imap_password_encrypted = crypto.encrypt_password(imap_password)
    db.commit()
    db.refresh(user)
    return user
