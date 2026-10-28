from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from .. import schemas, models, database
from typing import List

router = APIRouter()

def get_current_user_dummy():
    # For now, return the first user in DB (placeholder)
    db = database.SessionLocal()
    user = db.query(models.User).first()
    db.close()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="No users")
    return user

@router.post("/", response_model=schemas.SubscriptionOut)
def create_subscription(sub: schemas.SubscriptionCreate, db: Session = Depends(database.SessionLocal), current_user: models.User = Depends(get_current_user_dummy)):
    db_sub = models.Subscription(
        user_id=current_user.id,
        name=sub.name,
        provider=sub.provider,
        start_date=sub.start_date,
        expiry_date=sub.expiry_date,
        priority=sub.priority,
        last_payment_amount=sub.last_payment_amount,
        notes=sub.notes,
    )
    db.add(db_sub)
    db.commit()
    db.refresh(db_sub)
    return db_sub

@router.get("/", response_model=List[schemas.SubscriptionOut])
def list_subscriptions(skip: int = 0, limit: int = 100, db: Session = Depends(database.SessionLocal), current_user: models.User = Depends(get_current_user_dummy)):
    subs = db.query(models.Subscription).filter(models.Subscription.user_id == current_user.id).offset(skip).limit(limit).all()
    return subs

@router.get("/{sub_id}", response_model=schemas.SubscriptionOut)
def get_subscription(sub_id: int, db: Session = Depends(database.SessionLocal), current_user: models.User = Depends(get_current_user_dummy)):
    sub = db.query(models.Subscription).filter(models.Subscription.id == sub_id, models.Subscription.user_id == current_user.id).first()
    if not sub:
        raise HTTPException(status_code=404, detail="Subscription not found")
    return sub

@router.put("/{sub_id}", response_model=schemas.SubscriptionOut)
def update_subscription(sub_id: int, sub_update: schemas.SubscriptionUpdate, db: Session = Depends(database.SessionLocal), current_user: models.User = Depends(get_current_user_dummy)):
    sub = db.query(models.Subscription).filter(models.Subscription.id == sub_id, models.Subscription.user_id == current_user.id).first()
    if not sub:
        raise HTTPException(status_code=404, detail="Subscription not found")
    update_data = sub_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(sub, key, value)
    db.commit()
    db.refresh(sub)
    return sub

@router.delete("/{sub_id}", status_code=204)
def delete_subscription(sub_id: int, db: Session = Depends(database.SessionLocal), current_user: models.User = Depends(get_current_user_dummy)):
    sub = db.query(models.Subscription).filter(models.Subscription.id == sub_id, models.Subscription.user_id == current_user.id).first()
    if not sub:
        raise HTTPException(status_code=404, detail="Subscription not found")
    db.delete(sub)
    db.commit()
    return None
