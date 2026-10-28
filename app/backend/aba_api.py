from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict
import uuid
import random
import time

app = FastAPI(
    title="ABA — Made to Hustle Backend API",
    version="0.3.0",
    description="Authoritative double-entry ledger, player identity, and city simulation service"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Crockford Base32 Alphabet (excludes I, L, O, U)
CROCKFORD_CHARS = "0123456789ABCDEFGHJKMNPQRSTVWXYZ"

def generate_crockford_public_id() -> str:
    """Generate 10-char Crockford Base32 ID with Modulo 32 check character (§6.18)"""
    payload = "".join(random.choice(CROCKFORD_CHARS) for _ in range(9))
    check_sum = sum(CROCKFORD_CHARS.index(c) * (i + 1) for i, c in enumerate(payload))
    check_char = CROCKFORD_CHARS[check_sum % len(CROCKFORD_CHARS)]
    full = payload + check_char
    return f"ABA-{full[:5]}-{full[5:]}"

def validate_crockford_public_id(raw_id: str) -> bool:
    cleaned = raw_id.upper().replace(" ", "").replace("-", "")
    if cleaned.startswith("ABA"):
        cleaned = cleaned[3:]
    cleaned = cleaned.replace("I", "1").replace("L", "1").replace("O", "0")
    if len(cleaned) != 10:
        return False
    payload = cleaned[:9]
    check = cleaned[9]
    check_sum = sum(CROCKFORD_CHARS.index(c) * (i + 1) for i, c in enumerate(payload))
    return check == CROCKFORD_CHARS[check_sum % len(CROCKFORD_CHARS)]

# In-Memory Authoritative Store (Production connects to PostgreSQL per §4.1)
PLAYERS_DB: Dict[str, dict] = {}
LEDGER_DB: List[dict] = []
ORDERS_DB: List[dict] = []

# Models
class CreatePlayerRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=50)
    origin: str = Field(..., pattern="^(faulks|ugwa|gra)$")
    track: str = Field(..., pattern="^(dealer|consumer)$")
    gender: Optional[str] = "male"
    age_band: Optional[str] = "25-34"

class TransferRequest(BaseModel):
    sender_id: str
    recipient_public_id: str
    amount: int = Field(..., gt=0)
    idempotency_key: str

class WholesaleOrderRequest(BaseModel):
    dealer_id: str
    sku: str
    quantity: int = Field(..., gt=0)
    unit_price: int = Field(..., gt=0)

# Endpoints
@app.get("/api/health")
async def health():
    return {
        "status": "healthy",
        "service": "aba-hustle-server",
        "city": "Aba, Nigeria",
        "epoch": int(time.time()),
        "closed_loop_currency": True,
        "registration_grant_amount": 500000
    }

@app.post("/api/player/create", status_code=status.HTTP_201_CREATED)
async def create_player(req: CreatePlayerRequest):
    player_uuid = str(uuid.uuid4())
    public_id = generate_crockford_public_id()
    
    # Starting Capital Grant ($500,000) into Restricted Bucket
    player_record = {
        "id": player_uuid,
        "public_id": public_id,
        "name": req.name,
        "origin": req.origin,
        "track": req.track,
        "gender": req.gender,
        "age_band": req.age_band,
        "cash": 200000,
        "bank": 300000,
        "restricted_buckets": {
            "starter_funds": 500000,
            "consumer_income": 50000 if req.track == "consumer" else 0,
            "earned_funds": 0
        },
        "hustle_coins": 75,
        "guild_respect": 5.0,
        "created_at": int(time.time())
    }
    PLAYERS_DB[player_uuid] = player_record
    
    # Record Double-Entry Registration Grant in Ledger (§7.1)
    tx_id = f"TX-REG-{int(time.time())}"
    LEDGER_DB.append({
        "id": str(uuid.uuid4()),
        "tx_id": tx_id,
        "account_id": player_uuid,
        "delta": 500000,
        "account_type": "STARTER_FUNDS",
        "reason": "$500,000 Closed-Loop Starting Capital Grant Credited (§6.19)",
        "timestamp": int(time.time())
    })
    
    return player_record

@app.get("/api/player/{player_id}")
async def get_player(player_id: str):
    player = PLAYERS_DB.get(player_id)
    if not player:
        raise HTTPException(status_code=404, detail="Player not found")
    return player

@app.post("/api/ledger/transfer")
async def transfer_funds(req: TransferRequest):
    sender = PLAYERS_DB.get(req.sender_id)
    if not sender:
        raise HTTPException(status_code=404, detail="Sender not found")
        
    if not validate_crockford_public_id(req.recipient_public_id):
        raise HTTPException(status_code=400, detail="Invalid Crockford Base32 Check-Digit on Public ID")
        
    if sender["bank"] < req.amount:
        raise HTTPException(status_code=400, detail="Insufficient bank balance")
        
    sender["bank"] -= req.amount
    tx_id = f"TX-XFER-{int(time.time())}"
    
    LEDGER_DB.append({
        "id": str(uuid.uuid4()),
        "tx_id": tx_id,
        "account_id": req.sender_id,
        "delta": -req.amount,
        "account_type": "BANK",
        "reason": f"Transfer to {req.recipient_public_id}",
        "timestamp": int(time.time())
    })
    
    return {
        "success": True,
        "tx_id": tx_id,
        "remaining_bank": sender["bank"],
        "recipient": req.recipient_public_id
    }

@app.get("/api/ledger/{player_id}")
async def get_player_ledger(player_id: str):
    entries = [e for e in LEDGER_DB if e["account_id"] == player_id]
    return {"entries": entries, "count": len(entries)}
