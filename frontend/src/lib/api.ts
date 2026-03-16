const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

export async function healthCheck() {
  const res = await fetch(`${BACKEND_URL}/health`);
  return res.json();
}

export async function processLead(leadData: any) {
  const res = await fetch(`${BACKEND_URL}/process-lead`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(leadData),
  });
  return res.json();
}
