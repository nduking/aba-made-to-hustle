from cryptography.fernet import Fernet
import os

# Fernet key must be 32 url-safe base64-encoded bytes
FERNET_KEY = os.getenv("FERNET_KEY")
if not FERNET_KEY:
    raise RuntimeError("FERNET_KEY not set in environment")

fernet = Fernet(FERNET_KEY)

def encrypt_password(plain_password: str) -> str:
    return fernet.encrypt(plain_password.encode()).decode()

def decrypt_password(token: str) -> str:
    return fernet.decrypt(token.encode()).decode()
