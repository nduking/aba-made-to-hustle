from sqlalchemy import Column, Integer, String, DateTime, Enum, Numeric, Boolean, ForeignKey
from sqlalchemy.orm import relationship
import enum
from .database import Base

class PriorityEnum(str, enum.Enum):
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    imap_host = Column(String, nullable=False)
    imap_username = Column(String, nullable=False)
    imap_password_encrypted = Column(String, nullable=False)
    is_admin = Column(Boolean, default=False, nullable=False)
    google_refresh_token = Column(String, nullable=True)
    created_at = Column(DateTime, server_default="now()")


    subscriptions = relationship("Subscription", back_populates="user")
    email_messages = relationship("EmailMessage", back_populates="user")
    push_subscriptions = relationship("PushSubscription", back_populates="user")

class Subscription(Base):
    __tablename__ = "subscriptions"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    name = Column(String, nullable=False)
    provider = Column(String, nullable=True)
    start_date = Column(DateTime, nullable=True)
    expiry_date = Column(DateTime, nullable=False)
    priority = Column(Enum(PriorityEnum), default=PriorityEnum.MEDIUM, nullable=False)
    last_payment_amount = Column(Numeric(10, 2), nullable=True)
    notes = Column(String, nullable=True)

    user = relationship("User", back_populates="subscriptions")

class EmailMessage(Base):
    __tablename__ = "email_messages"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    message_id = Column(String, unique=True, nullable=False)
    subject = Column(String, nullable=False)
    received_at = Column(DateTime, nullable=False)
    processed = Column(Boolean, default=False)

    user = relationship("User", back_populates="email_messages")

class PushSubscription(Base):
    __tablename__ = "push_subscriptions"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    endpoint = Column(String, nullable=False)
    keys_auth = Column(String, nullable=False)
    keys_p256dh = Column(String, nullable=False)
    created_at = Column(DateTime, server_default="now()")

    user = relationship("User", back_populates="push_subscriptions")
