import time
import requests

# 👉 Change this URL depending on test
# Normal:
# URL = "http://127.0.0.1:5000/call-b"

# Delay test:
# URL = "http://127.0.0.1:5000/call-b?delay=5"

# Error test:
URL = "http://127.0.0.1:5000/call-b?fail=true"

THRESHOLD = 2  # seconds

while True:
    try:
        start = time.time()

        response = requests.get(URL)

        latency = time.time() - start

        print("Response:", response.json())
        print("Latency:", round(latency, 2))

        # 🔥 DETECTION LOGIC

        if latency > THRESHOLD:
            print("🚨 INCIDENT DETECTED: High latency")

            # 🔥 SEND TO INCIDENT RECEIVER
            requests.post("http://127.0.0.1:6000/incident", json={
                "type": "latency",
                "value": latency
            })

        if "error" in response.json():
            print("🚨 INCIDENT DETECTED: Error in API")

            # 🔥 SEND TO INCIDENT RECEIVER
            requests.post("http://127.0.0.1:6000/incident", json={
                "type": "error",
                "details": response.json()
            })

    except Exception as e:
        print("Exception:", str(e))

    time.sleep(2)