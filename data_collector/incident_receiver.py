from fastapi import FastAPI

app = FastAPI()

@app.post("/incident")
def receive_incident(data: dict):
    print("🚨 INCIDENT RECEIVED:", data)
    return {"status": "received"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=6000)