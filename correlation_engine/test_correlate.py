from correlate import correlate

def run_test(test_name, data):
    print(f"\n--- {test_name} ---")
    try:
        result = correlate(data)
        print("✅ No crash")
        print("Output:", result)

        # Check schema
        required_keys = ["root_cause", "confidence", "explanation", "fix_suggestions"]

        for key in required_keys:
            if key not in result:
                print(f"❌ Missing key: {key}")
        
        if not isinstance(result.get("fix_suggestions", []), list):
            print("❌ fix_suggestions is not a list")

        if result.get("confidence") not in ["low", "medium", "high"]:
            print("❌ Invalid confidence value")

    except Exception as e:
        print("❌ CRASHED:", str(e))


# 🔥 TEST CASES

# 1. Normal case
run_test("Normal Input", {
    "service": "service-a",
    "latency": "1500",
    "error_rate": "5",
    "logs": "timeout error",
    "trace_summary": "service-a -> service-b"
})

# 2. Missing fields
run_test("Missing Fields", {})

# 3. Invalid values
run_test("Invalid Values", {
    "service": None,
    "latency": "abc",
    "error_rate": "xyz",
    "logs": None,
    "trace_summary": None
})

# 4. High error rate
run_test("High Error", {
    "service": "service-a",
    "latency": "200",
    "error_rate": "20",
    "logs": "failure",
    "trace_summary": ""
})

# 5. Service-b latency
run_test("Service-B Slow", {
    "service": "service-b",
    "latency": "2000",
    "error_rate": "2",
    "logs": "",
    "trace_summary": ""
})