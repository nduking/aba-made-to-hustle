from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from .. import models, schemas, database
from ..main import get_current_user

router = APIRouter(prefix="/admin", tags=["admin"])


def admin_required(current_user: models.User = Depends(get_current_user)):
    if not getattr(current_user, "is_admin", False):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin privileges required")
    return current_user


@router.get("/users", response_model=list[schemas.UserOut])
def list_users(db: Session = Depends(database.SessionLocal), _: models.User = Depends(admin_required)):
    users = db.query(models.User).all()
    return users
