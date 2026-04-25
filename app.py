import sys
import os

# Ensure correlation_engine folder is accessible
sys.path.append(os.path.join(os.path.dirname(__file__), "correlation_engine"))

from fastapi import FastAPI
from incident_ai import analyze_incident
from correlate import correlate
from pyngrok import ngrok

app = FastAPI()

# 🔒 simple in-memory store for last incident (for chat/summary)
LAST_INCIDENT = {
    "input": None,
    "output": None
}


# -------------------------
# 🧠 CORE ANALYZE ENDPOINT
# -------------------------
@app.post("/analyze")
def analyze(data: dict):
    corr_result = correlate(data)
    ai_result = analyze_incident(data, corr_result)

    service = str(data.get("service", "")).lower()
    logs = str(data.get("logs", "")).lower()

    # 🔥 Smart root-cause routing
    if "auth" in service or "jwt" in logs or "token" in logs:
        ai_result["root_cause"] = "JWT token validation failure / misconfiguration"
        ai_result["confidence"] = "high"

    elif "timeout" in logs or "db" in logs or "connection pool" in logs:
        ai_result["root_cause"] = "Database connection pool exhaustion"
        ai_result["confidence"] = "high"

    else:
        # fallback to correlation if it's specific
        rc = corr_result.get("root_cause", "")
        if rc and rc.lower() not in ["timeout issue", "unknown"]:
            ai_result["root_cause"] = rc
            ai_result["confidence"] = corr_result.get(
                "confidence",
                ai_result.get("confidence", "medium")
            )

    # 🔥 store for agent modes
    LAST_INCIDENT["input"] = data
    LAST_INCIDENT["output"] = ai_result

    return ai_result


# -------------------------
# 🤖 MULTI-PORTAL AGENT
# -------------------------
@app.post("/agent")
def agent_router(data: dict):
    mode = data.get("mode", "incident")

    # 🧩 1. Incident Agent (same as /analyze)
    if mode == "incident":
        return analyze(data)

    # 🧩 2. Chat Agent
    elif mode == "chat":
        query = data.get("query", "")

        if not LAST_INCIDENT["output"]:
            return {"answer": "No incident analyzed yet."}

        rc = LAST_INCIDENT["output"].get("root_cause", "unknown")
        explanation = LAST_INCIDENT["output"].get("explanation", "")

        return {
            "answer": f"Root cause: {rc}. {explanation} | Your question: {query}"
        }

    # 🧩 3. Summary Agent
    elif mode == "summary":

        if not LAST_INCIDENT["output"]:
            return {"summary": "No incident available."}

        out = LAST_INCIDENT["output"]

        return {
            "summary": out.get("summary"),
            "root_cause": out.get("root_cause"),
            "top_fixes": out.get("fix_suggestions", [])[:3]
        }

    # 🧩 Unknown mode
    return {"error": "Invalid mode. Use incident/chat/summary"}


# 🔥 Expose API publicly
public_url = ngrok.connect(8000)
print("Public URL:", public_url)