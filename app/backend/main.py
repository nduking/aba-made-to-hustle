from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from . import models, schemas, database, email_service, tasks, notifications, utils
from .utils import security
from .routers import auth, subscriptions, settings as settings_router, push as push_router

app = FastAPI(title="Subscription Tracker API")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

# Dependency to get DB session
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Dependency to get current user from JWT
async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = security.decode_access_token(token)
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    except Exception:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    user = db.query(models.User).filter(models.User.id == int(user_id)).first()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
    return user

@app.get("/health")
async def health_check():
    return {"status": "ok"}

# Include routers
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(subscriptions.router, prefix="/subscriptions", tags=["subscriptions"], dependencies=[Depends(get_current_user)])
app.include_router(settings_router.router, prefix="/settings", tags=["settings"], dependencies=[Depends(get_current_user)])
from .routers import admin as admin_router

app.include_router(admin_router.router, prefix="/admin", tags=["admin"], dependencies=[Depends(get_current_user)])
