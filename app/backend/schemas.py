from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
from enum import Enum

class Priority(str, Enum):
    high = "high"
    medium = "medium"
    low = "low"

class SubscriptionBase(BaseModel):
    name: str = Field(..., example="Netflix")
    provider: Optional[str] = Field(None, example="Netflix Inc.")
    start_date: Optional[datetime] = None
    expiry_date: datetime
    priority: Priority = Priority.medium
    last_payment_amount: Optional[float] = None
    notes: Optional[str] = None

class SubscriptionCreate(SubscriptionBase):
    pass

class SubscriptionUpdate(BaseModel):
    name: Optional[str] = None
    provider: Optional[str] = None
    start_date: Optional[datetime] = None
    expiry_date: Optional[datetime] = None
    priority: Optional[Priority] = None
    last_payment_amount: Optional[float] = None
    notes: Optional[str] = None

class SubscriptionOut(SubscriptionBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    imap_host: str
    imap_username: str
    imap_password: str

class UserOut(UserBase):
    id: int
    imap_host: str
    imap_username: str
    is_admin: bool

    class Config:
        orm_mode = True

class PushSubscriptionBase(BaseModel):
    endpoint: str = Field(..., example="https://fcm.googleapis.com/fcm/send/...")
    keys_auth: str = Field(..., example="auth_key")
    keys_p256dh: str = Field(..., example="p256dh_key")

class PushSubscriptionCreate(PushSubscriptionBase):
    pass

class PushSubscriptionOut(PushSubscriptionBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True
