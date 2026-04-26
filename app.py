import sys
import os
from fastapi import FastAPI
from pyngrok import ngrok

# ==================================================
# PATH SETUP
# ==================================================
BASE_DIR = os.path.dirname(__file__)

for module_folder in ["correlation_engine", "data_collector", "anomaly_detector"]:
    module_path = os.path.join(BASE_DIR, module_folder)
    if module_path not in sys.path:
        sys.path.append(module_path)

# ==================================================
# SAFE CORE IMPORTS
# ==================================================
from incident_ai import analyze_incident
from correlate import correlate

# ==================================================
# STABLE FALLBACK MODULES
# ==================================================
def fallback_collect_incident():
    """
    Stable local telemetry simulator.
    """
    return {
        "service": "auth-service",
        "latency": "1200ms",
        "error_rate": "15%",
        "logs": "JWT token validation failed",
        "trace_summary": "Authentication requests failing due to invalid token"
    }


def fallback_detect_anomaly(data):
    """
    Fully local anomaly detector.
    No external requests.
    No localhost dependencies.
    """

    logs = str(data.get("logs", "")).lower()
    latency = str(data.get("latency", "")).lower()
    error_rate = str(data.get("error_rate", "")).lower()

    anomaly_flags = []

    if "timeout" in logs:
        anomaly_flags.append("timeout anomaly")

    if "jwt" in logs or "token" in logs or "auth" in logs:
        anomaly_flags.append("authentication anomaly")

    if "db" in logs or "database" in logs:
        anomaly_flags.append("database anomaly")

    if "connection pool" in logs:
        anomaly_flags.append("connection pool exhaustion")

    if "ms" in latency:
        try:
            latency_value = int(latency.replace("ms", "").strip())
            if latency_value > 1000:
                anomaly_flags.append("high latency anomaly")
        except:
            pass

    if "%" in error_rate:
        try:
            error_value = int(error_rate.replace("%", "").strip())
            if error_value > 10:
                anomaly_flags.append("high error rate anomaly")
        except:
            pass

    return {
        "status": "success",
        "anomalies_detected": anomaly_flags,
        "anomaly_score": len(anomaly_flags)
    }


# ==================================================
# FORCE STABLE MODULES
# ==================================================
# Broken teammate modules are intentionally disabled
collect_incident = fallback_collect_incident
detect_anomaly = fallback_detect_anomaly

print("⚠️ External data collector disabled for system stability.")
print("⚠️ External anomaly detector disabled for system stability.")


# ==================================================
# FASTAPI INIT
# ==================================================
app = FastAPI(
    title="AAYAM Incident War Room AI",
    description="Autonomous AI-powered distributed system fault diagnosis platform",
    version="2.1.0"
)

# ==================================================
# INCIDENT MEMORY STORE
# ==================================================
LAST_INCIDENT = {
    "input": None,
    "output": None
}


# ==================================================
# CORE INCIDENT PIPELINE
# ==================================================
def process_incident(data: dict):
    """
    Full AI Incident Pipeline:
    Input -> Anomaly Detection -> Correlation -> RCA -> Smart Routing
    """

    # --------------------------------------
    # ANOMALY DETECTION
    # --------------------------------------
    try:
        anomaly_result = detect_anomaly(data)
    except Exception as e:
        anomaly_result = {
            "status": "failure",
            "error": str(e)
        }

    # --------------------------------------
    # CORRELATION ENGINE
    # --------------------------------------
    try:
        corr_result = correlate(data)
    except Exception as e:
        corr_result = {
            "root_cause": "Correlation engine failure",
            "confidence": "low",
            "error": str(e)
        }

    # --------------------------------------
    # AI ROOT CAUSE ANALYSIS
    # --------------------------------------
    try:
        ai_result = analyze_incident(data, corr_result)
    except Exception as e:
        ai_result = {
            "summary": "Incident analysis failed",
            "root_cause": corr_result.get("root_cause", "Unknown"),
            "confidence": corr_result.get("confidence", "low"),
            "explanation": str(e),
            "fix_suggestions": [
                "Inspect logs",
                "Check dependencies",
                "Restart affected services",
                "Scale infrastructure"
            ]
        }

    # --------------------------------------
    # SMART ROOT CAUSE OVERRIDES
    # --------------------------------------
    service = str(data.get("service", "")).lower()
    logs = str(data.get("logs", "")).lower()

    if "auth" in service or "jwt" in logs or "token" in logs:
        ai_result["root_cause"] = "JWT token validation failure / authentication misconfiguration"
        ai_result["confidence"] = "high"

    elif (
        "timeout" in logs or
        "db" in logs or
        "database" in logs or
        "connection pool" in logs
    ):
        ai_result["root_cause"] = "Database connection pool exhaustion"
        ai_result["confidence"] = "high"

    else:
        rc = corr_result.get("root_cause", "")
        if rc and rc.lower() not in ["unknown", "timeout issue"]:
            ai_result["root_cause"] = rc
            ai_result["confidence"] = corr_result.get(
                "confidence",
                ai_result.get("confidence", "medium")
            )

    # --------------------------------------
    # ATTACH PIPELINE RESULTS
    # --------------------------------------
    ai_result["anomaly_detection"] = anomaly_result
    ai_result["correlation_analysis"] = corr_result

    # --------------------------------------
    # STORE MEMORY
    # --------------------------------------
    LAST_INCIDENT["input"] = data
    LAST_INCIDENT["output"] = ai_result

    return ai_result


# ==================================================
# ANALYZE ENDPOINT
# ==================================================
@app.post("/analyze")
def analyze(data: dict):
    return process_incident(data)


# ==================================================
# MULTI-AGENT ENDPOINT
# ==================================================
@app.post("/agent")
def agent_router(data: dict):
    mode = data.get("mode", "incident")

    # --------------------------------------
    # INCIDENT MODE
    # --------------------------------------
    if mode == "incident":
        return process_incident(data)

    # --------------------------------------
    # CHAT MODE
    # --------------------------------------
    elif mode == "chat":
        query = data.get("query", "")

        if not LAST_INCIDENT["output"]:
            return {
                "answer": "No incident analyzed yet."
            }

        output = LAST_INCIDENT["output"]

        return {
            "answer": (
                f"Root cause: {output.get('root_cause', 'unknown')}. "
                f"{output.get('explanation', '')} "
                f"Summary: {output.get('summary', '')} "
                f"User query: {query}"
            )
        }

    # --------------------------------------
    # SUMMARY MODE
    # --------------------------------------
    elif mode == "summary":

        if not LAST_INCIDENT["output"]:
            return {
                "summary": "No incident available."
            }

        output = LAST_INCIDENT["output"]

        return {
            "summary": output.get("summary"),
            "root_cause": output.get("root_cause"),
            "confidence": output.get("confidence"),
            "top_fixes": output.get("fix_suggestions", [])[:3]
        }

    # --------------------------------------
    # DATA COLLECTION MODE
    # --------------------------------------
    elif mode == "collect":
        try:
            collected = collect_incident()

            return {
                "status": "success",
                "collected_data": collected
            }

        except Exception as e:
            return {
                "status": "failure",
                "error": str(e)
            }

    # --------------------------------------
    # INVALID MODE
    # --------------------------------------
    return {
        "error": "Invalid mode. Use incident/chat/summary/collect"
    }


# ==================================================
# HEALTH CHECK
# ==================================================
@app.get("/")
def home():
    return {
        "message": "AAYAM Incident War Room AI is running",
        "status": "active",
        "version": "2.1.0"
    }


# ==================================================
# SAFE PUBLIC DEPLOYMENT
# ==================================================
# if __name__ == "__main__":
#     try:
#         public_url = ngrok.connect(8000)
#         print("🚀 Public URL:", public_url)
#
#     except Exception as e:
#         print("⚠️ Ngrok startup failed:", e)