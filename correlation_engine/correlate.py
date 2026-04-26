def safe_float(value):
    try:
        return float(value)
    except:
        return 0


def safe_str(value):
    return str(value) if value is not None else ""


def correlate(data):
    try:
        # ✅ Safe input handling
        service = safe_str(data.get("service")) or "unknown"
        latency = safe_float(data.get("latency"))
        error_rate = safe_float(data.get("error_rate"))
        logs = safe_str(data.get("logs"))
        trace = safe_str(data.get("trace_summary"))

        # ✅ Default response
        root_cause = "unknown"
        confidence = "low"
        explanation = "Not enough data"
        fix_suggestions = []

        # 🔴 Handle completely invalid input
        if latency == 0 and error_rate == 0 and logs == "" and trace == "":
            return {
                "root_cause": "insufficient data",
                "confidence": "low",
                "explanation": "Invalid or missing input data",
                "fix_suggestions": ["Check monitoring inputs"]
            }

        # 🔹 Rule 1: service-a depends on service-b
        if service == "service-a" and latency > 1000:
            root_cause = "service-b latency issue"
            confidence = "high"
            explanation = "service-a is slow because downstream service-b is responding slowly"
            fix_suggestions = [
                "Check service-b performance",
                "Optimize database queries in service-b",
                "Add caching or scaling to service-b"
            ]

        # 🔹 Rule 2: High error rate
        elif error_rate > 10:
            root_cause = f"{service} high error rate"
            confidence = "high"
            explanation = f"{service} is failing frequently causing instability"
            fix_suggestions = [
                "Check logs for exceptions",
                "Fix failing endpoints",
                "Add error handling and retries"
            ]

        # 🔹 Rule 3: service-b slow
        elif service == "service-b" and latency > 1000:
            root_cause = "service-b internal delay"
            confidence = "medium"
            explanation = "service-b is taking too long to process requests"
            fix_suggestions = [
                "Optimize internal logic",
                "Check database latency",
                "Increase CPU/memory resources"
            ]

        # 🔹 Rule 4: Database issue from logs
        elif "db" in logs.lower():
            root_cause = "database issue"
            confidence = "medium"
            explanation = "Logs indicate database-related errors"
            fix_suggestions = [
                "Check database connection",
                "Increase connection pool",
                "Optimize queries"
            ]

        # 🔹 Rule 5: Timeout detection
        elif "timeout" in logs.lower():
            root_cause = "timeout issue"
            confidence = "high"
            explanation = "Requests are timing out, likely due to slow downstream service"
            fix_suggestions = [
                "Increase timeout limits",
                "Optimize slow services",
                "Add retries and circuit breakers"
            ]

        return {
            "root_cause": root_cause,
            "confidence": confidence,
            "explanation": explanation,
            "fix_suggestions": fix_suggestions
        }

    except Exception as e:
        # 🔴 Absolute fallback (never crash)
        return {
            "root_cause": "system error",
            "confidence": "low",
            "explanation": str(e),
            "fix_suggestions": ["Check correlation engine"]
        }


# ✅ TEST BLOCK (optional)
if __name__ == "__main__":
    test_data = {
        "service": "service-a",
        "latency": "1500",
        "error_rate": "5",
        "logs": "timeout error",
        "trace_summary": "service-a -> service-b"
    }

    result = correlate(test_data)
    print(result)