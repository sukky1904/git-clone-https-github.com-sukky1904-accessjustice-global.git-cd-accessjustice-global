from fastapi import FastAPI, APIRouter, HTTPException, Depends, Request, Response
from fastapi.security import HTTPBearer
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import bcrypt
import jwt
import httpx

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# JWT Config
JWT_SECRET = os.environ.get('JWT_SECRET', 'default-secret-key')
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_HOURS = 168  # 7 days

# Create the main app
app = FastAPI(title="AccessJustice.Global API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

security = HTTPBearer(auto_error=False)

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# ==================== MODELS ====================

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    name: str
    role: str = "citizen"  # citizen, lawyer, partner

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    user_id: str
    email: str
    name: str
    role: str
    picture: Optional[str] = None
    created_at: datetime

class LawyerProfile(BaseModel):
    user_id: str
    bar_number: Optional[str] = None
    practice_areas: List[str] = []
    bio: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    is_verified: bool = False
    subscription_status: str = "inactive"

class LawyerCreate(BaseModel):
    bar_number: str
    practice_areas: List[str]
    bio: str
    phone: str
    location: str

class LegalTemplate(BaseModel):
    template_id: str
    title: str
    description: str
    category: str
    content: str
    download_count: int = 0
    created_at: datetime

class TemplateCreate(BaseModel):
    title: str
    description: str
    category: str
    content: str

class ChatMessage(BaseModel):
    message_id: str
    session_id: str
    user_id: Optional[str] = None
    role: str  # user or assistant
    content: str
    timestamp: datetime

class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None
    topic: Optional[str] = None

class ContactSubmission(BaseModel):
    submission_id: str
    name: str
    email: str
    organization: Optional[str] = None
    message: str
    submission_type: str  # general, partnership, lawyer_inquiry
    created_at: datetime

class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    organization: Optional[str] = None
    message: str
    submission_type: str = "general"

class JusticeWalletApplication(BaseModel):
    application_id: str
    user_id: Optional[str] = None
    name: str
    email: str
    case_description: str
    income_level: str
    status: str = "pending"
    created_at: datetime

class JusticeWalletCreate(BaseModel):
    name: str
    email: EmailStr
    case_description: str
    income_level: str

# ==================== AUTH HELPERS ====================

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

def create_jwt_token(user_id: str, email: str, role: str) -> str:
    payload = {
        "user_id": user_id,
        "email": email,
        "role": role,
        "exp": datetime.now(timezone.utc) + timedelta(hours=JWT_EXPIRATION_HOURS)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

async def get_current_user(request: Request) -> Optional[dict]:
    # Check cookie first
    session_token = request.cookies.get("session_token")
    
    # Fallback to Authorization header
    if not session_token:
        auth_header = request.headers.get("Authorization")
        if auth_header and auth_header.startswith("Bearer "):
            session_token = auth_header.split(" ")[1]
    
    if not session_token:
        return None
    
    # Try JWT token first
    try:
        payload = jwt.decode(session_token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        user = await db.users.find_one({"user_id": payload["user_id"]}, {"_id": 0})
        return user
    except jwt.ExpiredSignatureError:
        pass
    except jwt.InvalidTokenError:
        pass
    
    # Try session token (Google OAuth)
    session = await db.user_sessions.find_one({"session_token": session_token}, {"_id": 0})
    if session:
        expires_at = session.get("expires_at")
        if isinstance(expires_at, str):
            expires_at = datetime.fromisoformat(expires_at)
        if expires_at.tzinfo is None:
            expires_at = expires_at.replace(tzinfo=timezone.utc)
        if expires_at > datetime.now(timezone.utc):
            user = await db.users.find_one({"user_id": session["user_id"]}, {"_id": 0})
            return user
    
    return None

async def require_auth(request: Request) -> dict:
    user = await get_current_user(request)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    return user

# ==================== AUTH ENDPOINTS ====================

@api_router.post("/auth/register")
async def register(user_data: UserCreate):
    existing = await db.users.find_one({"email": user_data.email}, {"_id": 0})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user_id = f"user_{uuid.uuid4().hex[:12]}"
    user_doc = {
        "user_id": user_id,
        "email": user_data.email,
        "password_hash": hash_password(user_data.password),
        "name": user_data.name,
        "role": user_data.role,
        "picture": None,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    
    await db.users.insert_one(user_doc)
    
    token = create_jwt_token(user_id, user_data.email, user_data.role)
    
    return {
        "token": token,
        "user": {
            "user_id": user_id,
            "email": user_data.email,
            "name": user_data.name,
            "role": user_data.role
        }
    }

@api_router.post("/auth/login")
async def login(response: Response, credentials: UserLogin):
    user = await db.users.find_one({"email": credentials.email}, {"_id": 0})
    if not user or not verify_password(credentials.password, user.get("password_hash", "")):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_jwt_token(user["user_id"], user["email"], user["role"])
    
    response.set_cookie(
        key="session_token",
        value=token,
        httponly=True,
        secure=True,
        samesite="none",
        max_age=JWT_EXPIRATION_HOURS * 3600,
        path="/"
    )
    
    return {
        "token": token,
        "user": {
            "user_id": user["user_id"],
            "email": user["email"],
            "name": user["name"],
            "role": user["role"],
            "picture": user.get("picture")
        }
    }

@api_router.post("/auth/session")
async def exchange_session(request: Request, response: Response):
    """Exchange Google OAuth session_id for user data and set cookie"""
    body = await request.json()
    session_id = body.get("session_id")
    
    if not session_id:
        raise HTTPException(status_code=400, detail="session_id required")
    
    # Call Emergent Auth to get session data
    async with httpx.AsyncClient() as client_http:
        auth_response = await client_http.get(
            "https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data",
            headers={"X-Session-ID": session_id}
        )
    
    if auth_response.status_code != 200:
        raise HTTPException(status_code=401, detail="Invalid session")
    
    session_data = auth_response.json()
    email = session_data["email"]
    name = session_data["name"]
    picture = session_data.get("picture")
    session_token = session_data["session_token"]
    
    # Find or create user
    existing_user = await db.users.find_one({"email": email}, {"_id": 0})
    
    if existing_user:
        user_id = existing_user["user_id"]
        # Update user info
        await db.users.update_one(
            {"user_id": user_id},
            {"$set": {"name": name, "picture": picture}}
        )
    else:
        user_id = f"user_{uuid.uuid4().hex[:12]}"
        await db.users.insert_one({
            "user_id": user_id,
            "email": email,
            "name": name,
            "picture": picture,
            "role": "citizen",
            "created_at": datetime.now(timezone.utc).isoformat()
        })
    
    # Store session
    expires_at = datetime.now(timezone.utc) + timedelta(days=7)
    await db.user_sessions.update_one(
        {"user_id": user_id},
        {"$set": {
            "session_token": session_token,
            "expires_at": expires_at.isoformat(),
            "created_at": datetime.now(timezone.utc).isoformat()
        }},
        upsert=True
    )
    
    response.set_cookie(
        key="session_token",
        value=session_token,
        httponly=True,
        secure=True,
        samesite="none",
        max_age=7 * 24 * 3600,
        path="/"
    )
    
    user = await db.users.find_one({"user_id": user_id}, {"_id": 0})
    
    return {
        "user": {
            "user_id": user["user_id"],
            "email": user["email"],
            "name": user["name"],
            "role": user["role"],
            "picture": user.get("picture")
        }
    }

@api_router.get("/auth/me")
async def get_me(request: Request):
    user = await get_current_user(request)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    return {
        "user_id": user["user_id"],
        "email": user["email"],
        "name": user["name"],
        "role": user["role"],
        "picture": user.get("picture")
    }

@api_router.post("/auth/logout")
async def logout(request: Request, response: Response):
    session_token = request.cookies.get("session_token")
    if session_token:
        await db.user_sessions.delete_one({"session_token": session_token})
    
    response.delete_cookie(key="session_token", path="/")
    return {"message": "Logged out successfully"}

# ==================== AI CHAT ENDPOINTS ====================

@api_router.post("/chat")
async def chat_with_ai(chat_request: ChatRequest, request: Request):
    from emergentintegrations.llm.chat import LlmChat, UserMessage
    
    user = await get_current_user(request)
    user_id = user["user_id"] if user else None
    
    session_id = chat_request.session_id or f"session_{uuid.uuid4().hex[:12]}"
    
    # Get chat history for context
    history = await db.chat_messages.find(
        {"session_id": session_id},
        {"_id": 0}
    ).sort("timestamp", 1).to_list(20)
    
    # Build system message
    system_message = """You are Justice AI, a helpful legal assistant for AccessJustice.Global. 
Your role is to provide general legal information and guidance in simple, clear language.

IMPORTANT DISCLAIMERS:
- You are NOT a lawyer and cannot provide legal advice
- You provide general legal information only
- Users should consult a qualified lawyer for specific legal matters
- Your guidance does not create an attorney-client relationship

Be helpful, empathetic, and clear. Focus on:
- Explaining legal concepts in simple terms
- Helping users understand their rights
- Suggesting next steps they can take
- Recommending when they should seek professional legal help

If the user mentions a specific jurisdiction (country/state), tailor your response accordingly.
If unclear, ask for their location to provide more relevant information."""

    if chat_request.topic:
        system_message += f"\n\nThe user has selected the topic: {chat_request.topic}. Focus your response on this area."
    
    # Initialize AI chat
    api_key = os.environ.get('EMERGENT_LLM_KEY')
    chat = LlmChat(
        api_key=api_key,
        session_id=session_id,
        system_message=system_message
    ).with_model("openai", "gpt-5.2")
    
    # Add history to chat context
    for msg in history:
        if msg["role"] == "user":
            chat.add_user_message(msg["content"])
        else:
            chat.add_assistant_message(msg["content"])
    
    # Create user message
    user_message = UserMessage(text=chat_request.message)
    
    try:
        # Get AI response
        ai_response = await chat.send_message(user_message)
        
        # Save user message
        user_msg_doc = {
            "message_id": f"msg_{uuid.uuid4().hex[:12]}",
            "session_id": session_id,
            "user_id": user_id,
            "role": "user",
            "content": chat_request.message,
            "timestamp": datetime.now(timezone.utc).isoformat()
        }
        await db.chat_messages.insert_one(user_msg_doc)
        
        # Save AI response
        ai_msg_doc = {
            "message_id": f"msg_{uuid.uuid4().hex[:12]}",
            "session_id": session_id,
            "user_id": user_id,
            "role": "assistant",
            "content": ai_response,
            "timestamp": datetime.now(timezone.utc).isoformat()
        }
        await db.chat_messages.insert_one(ai_msg_doc)
        
        return {
            "response": ai_response,
            "session_id": session_id
        }
    except Exception as e:
        logger.error(f"AI Chat Error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to get AI response")

@api_router.get("/chat/history/{session_id}")
async def get_chat_history(session_id: str):
    messages = await db.chat_messages.find(
        {"session_id": session_id},
        {"_id": 0}
    ).sort("timestamp", 1).to_list(100)
    
    return {"messages": messages, "session_id": session_id}

# ==================== LEGAL TEMPLATES ====================

@api_router.get("/templates")
async def get_templates(category: Optional[str] = None):
    query = {}
    if category:
        query["category"] = category
    
    templates = await db.legal_templates.find(query, {"_id": 0}).to_list(100)
    return {"templates": templates}

@api_router.get("/templates/{template_id}")
async def get_template(template_id: str):
    template = await db.legal_templates.find_one({"template_id": template_id}, {"_id": 0})
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")
    
    # Increment download count
    await db.legal_templates.update_one(
        {"template_id": template_id},
        {"$inc": {"download_count": 1}}
    )
    
    return template

@api_router.post("/templates")
async def create_template(template: TemplateCreate, request: Request):
    user = await require_auth(request)
    if user["role"] not in ["admin", "lawyer"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    template_doc = {
        "template_id": f"template_{uuid.uuid4().hex[:12]}",
        "title": template.title,
        "description": template.description,
        "category": template.category,
        "content": template.content,
        "download_count": 0,
        "created_by": user["user_id"],
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    
    await db.legal_templates.insert_one(template_doc)
    if "_id" in template_doc:
        del template_doc["_id"]
    
    return template_doc

# ==================== LAWYERS ====================

@api_router.get("/lawyers")
async def get_lawyers(practice_area: Optional[str] = None, location: Optional[str] = None):
    query = {"is_verified": True, "subscription_status": "active"}
    if practice_area:
        query["practice_areas"] = practice_area
    if location:
        query["location"] = {"$regex": location, "$options": "i"}
    
    # Join with users collection
    pipeline = [
        {"$match": query},
        {"$lookup": {
            "from": "users",
            "localField": "user_id",
            "foreignField": "user_id",
            "as": "user_info"
        }},
        {"$unwind": "$user_info"},
        {"$project": {
            "_id": 0,
            "user_id": 1,
            "bar_number": 1,
            "practice_areas": 1,
            "bio": 1,
            "phone": 1,
            "location": 1,
            "is_verified": 1,
            "name": "$user_info.name",
            "email": "$user_info.email",
            "picture": "$user_info.picture"
        }}
    ]
    
    lawyers = await db.lawyer_profiles.aggregate(pipeline).to_list(100)
    return {"lawyers": lawyers}

@api_router.post("/lawyers/register")
async def register_as_lawyer(lawyer_data: LawyerCreate, request: Request):
    user = await require_auth(request)
    
    # Check if already registered as lawyer
    existing = await db.lawyer_profiles.find_one({"user_id": user["user_id"]}, {"_id": 0})
    if existing:
        raise HTTPException(status_code=400, detail="Already registered as lawyer")
    
    lawyer_doc = {
        "user_id": user["user_id"],
        "bar_number": lawyer_data.bar_number,
        "practice_areas": lawyer_data.practice_areas,
        "bio": lawyer_data.bio,
        "phone": lawyer_data.phone,
        "location": lawyer_data.location,
        "is_verified": False,
        "subscription_status": "pending",
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    
    await db.lawyer_profiles.insert_one(lawyer_doc)
    
    # Update user role
    await db.users.update_one(
        {"user_id": user["user_id"]},
        {"$set": {"role": "lawyer"}}
    )
    
    return {"message": "Lawyer registration submitted for verification", "profile": lawyer_doc}

@api_router.get("/lawyers/{user_id}")
async def get_lawyer_profile(user_id: str):
    lawyer = await db.lawyer_profiles.find_one({"user_id": user_id}, {"_id": 0})
    if not lawyer:
        raise HTTPException(status_code=404, detail="Lawyer not found")
    
    user = await db.users.find_one({"user_id": user_id}, {"_id": 0})
    if user:
        lawyer["name"] = user.get("name")
        lawyer["email"] = user.get("email")
        lawyer["picture"] = user.get("picture")
    
    return lawyer

# ==================== CONTACT & PARTNERSHIPS ====================

@api_router.post("/contact")
async def submit_contact(contact: ContactCreate):
    submission_doc = {
        "submission_id": f"contact_{uuid.uuid4().hex[:12]}",
        "name": contact.name,
        "email": contact.email,
        "organization": contact.organization,
        "message": contact.message,
        "submission_type": contact.submission_type,
        "status": "new",
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    
    await db.contact_submissions.insert_one(submission_doc)
    
    return {"message": "Thank you for your message. We will get back to you soon.", "submission_id": submission_doc["submission_id"]}

# ==================== JUSTICE WALLET ====================

@api_router.post("/justice-wallet/apply")
async def apply_justice_wallet(application: JusticeWalletCreate, request: Request):
    user = await get_current_user(request)
    user_id = user["user_id"] if user else None
    
    application_doc = {
        "application_id": f"wallet_{uuid.uuid4().hex[:12]}",
        "user_id": user_id,
        "name": application.name,
        "email": application.email,
        "case_description": application.case_description,
        "income_level": application.income_level,
        "status": "pending",
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    
    await db.justice_wallet_applications.insert_one(application_doc)
    
    return {"message": "Your application has been submitted. We will review it and get back to you.", "application_id": application_doc["application_id"]}

@api_router.get("/justice-wallet/my-applications")
async def get_my_wallet_applications(request: Request):
    user = await require_auth(request)
    
    applications = await db.justice_wallet_applications.find(
        {"user_id": user["user_id"]},
        {"_id": 0}
    ).to_list(100)
    
    return {"applications": applications}

# ==================== STATS ====================

@api_router.get("/stats")
async def get_stats():
    # Get aggregated stats (no sensitive data)
    users_count = await db.users.count_documents({})
    templates_count = await db.legal_templates.count_documents({})
    lawyers_count = await db.lawyer_profiles.count_documents({"is_verified": True})
    chats_count = await db.chat_messages.count_documents({"role": "user"})
    
    return {
        "users_helped": users_count + 1250,  # Add baseline
        "legal_questions_answered": chats_count + 3500,
        "templates_available": templates_count + 25,
        "verified_lawyers": lawyers_count + 45
    }

# ==================== SEED DATA ====================

@api_router.post("/seed")
async def seed_data():
    """Seed initial data for templates"""
    templates = [
        {
            "template_id": "template_tenancy_001",
            "title": "Tenancy Agreement Template",
            "description": "Standard residential tenancy agreement for landlords and tenants.",
            "category": "Housing",
            "content": "TENANCY AGREEMENT\n\nThis agreement is made on [DATE] between:\n\nLANDLORD: [Name]\nTENANT: [Name]\n\n1. PROPERTY: [Address]\n2. TERM: [Duration]\n3. RENT: [Amount] per [period]\n\n[Additional terms...]",
            "download_count": 156,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "template_id": "template_complaint_001",
            "title": "Formal Complaint Letter",
            "description": "Template for writing formal complaints to businesses or organizations.",
            "category": "Consumer Rights",
            "content": "FORMAL COMPLAINT\n\nDate: [DATE]\n\nTo: [Recipient]\n\nRE: Formal Complaint Regarding [Issue]\n\nDear Sir/Madam,\n\nI am writing to formally complain about [describe issue]...\n\n[Body of complaint]\n\nI expect [resolution requested]...\n\nYours faithfully,\n[Your name]",
            "download_count": 89,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "template_id": "template_affidavit_001",
            "title": "General Affidavit Template",
            "description": "Sworn statement template for legal declarations.",
            "category": "Legal Documents",
            "content": "AFFIDAVIT\n\nI, [Full Name], of [Address], do solemnly and sincerely declare that:\n\n1. [Statement 1]\n2. [Statement 2]\n3. [Statement 3]\n\nI make this solemn declaration conscientiously believing the same to be true.\n\nDeclared at [Location] on [Date]\n\n_________________\nDeponent's Signature\n\nBefore me:\n_________________\nCommissioner for Oaths",
            "download_count": 234,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "template_id": "template_employment_001",
            "title": "Employment Contract Template",
            "description": "Basic employment contract for employers and employees.",
            "category": "Employment",
            "content": "EMPLOYMENT CONTRACT\n\nBetween: [Employer Name] (\"Employer\")\nAnd: [Employee Name] (\"Employee\")\n\n1. POSITION: [Job Title]\n2. START DATE: [Date]\n3. SALARY: [Amount] per [period]\n4. WORKING HOURS: [Hours]\n5. DUTIES: [Description]\n\n[Additional clauses...]\n\nSigned:\n_________________\nEmployer\n\n_________________\nEmployee",
            "download_count": 178,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "template_id": "template_petition_001",
            "title": "Court Petition Template",
            "description": "Basic petition format for filing in court.",
            "category": "Court Documents",
            "content": "IN THE [COURT NAME]\nSUIT NO: _______\n\nBETWEEN:\n[Petitioner Name] - PETITIONER\nAND\n[Respondent Name] - RESPONDENT\n\nPETITION\n\nThe humble petition of the Petitioner above-named states as follows:\n\n1. [Fact 1]\n2. [Fact 2]\n\nPRAYER:\nWherefore the Petitioner prays that this Honourable Court:\na) [Relief sought]\n\nDated this [Date]\n\n_________________\nPetitioner/Counsel",
            "download_count": 145,
            "created_at": datetime.now(timezone.utc).isoformat()
        }
    ]
    
    for template in templates:
        existing = await db.legal_templates.find_one({"template_id": template["template_id"]})
        if not existing:
            await db.legal_templates.insert_one(template)
    
    return {"message": "Seed data created successfully"}

# Root endpoint
@api_router.get("/")
async def root():
    return {"message": "AccessJustice.Global API", "version": "1.0.0"}

# Include the router
app.include_router(api_router)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    # Seed data on startup
    await seed_data()
    logger.info("AccessJustice.Global API started")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
