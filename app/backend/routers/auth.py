from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from .. import models, schemas, database, utils
from ..utils import security
from typing import Any

router = APIRouter()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register", response_model=schemas.UserOut)
def register(user_in: schemas.UserCreate, db: Session = Depends(get_db)):
    # Check if email already exists
    existing = db.query(models.User).filter(models.User.email == user_in.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    # Hash password
    pwd_hash = security.get_password_hash(user_in.imap_password)  # reuse password field for initial password
    # Encrypt IMAP password (store encrypted version)
    encrypted = utils.crypto.encrypt_password(user_in.imap_password)
    db_user = models.User(
        email=user_in.email,
        password_hash=pwd_hash,
        imap_host=user_in.imap_host,
        imap_username=user_in.imap_username,
        imap_password_encrypted=encrypted,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.post("/login")
def login(form: schemas.UserCreate, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == form.email).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    if not security.verify_password(form.imap_password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    access_token = security.create_access_token({"sub": str(user.id), "admin": user.is_admin})
    return {"access_token": access_token, "token_type": "bearer", "is_admin": user.is_admin}
