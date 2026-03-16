from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import os
from dotenv import load_dotenv
from supabase import create_client, Client

from fastapi.middleware.cors import CORSMiddleware

load_dotenv(dotenv_path="../.env")

app = FastAPI(title="Agency-OS Backend")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Supabase
url: str = os.environ.get("NEXT_PUBLIC_SUPABASE_URL", "")
key: str = os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY", "")
supabase: Client = create_client(url, key)

class Lead(BaseModel):
    name: str
    email: Optional[str] = None
    phone: str
    org_id: str
    status: str = "new"

@app.get("/health")
async def health_check():
    return {"status": "healthy", "version": "1.0.0"}

@app.post("/process-lead")
async def process_lead(lead: Lead):
    try:
        data, count = supabase.table("leads").insert(lead.dict()).execute()
        return {"message": "Lead processed successfully", "data": data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
