from fastapi import FastAPI
import time

app = FastAPI()

@app.get("/")
def home():
    return {"message": "API is running"}

@app.get("/call-b")
def call_b(delay: int = 0, fail: bool = False):
    if delay > 0:
        time.sleep(delay)

    if fail:
        return {"error": "Simulated failure"}

    return {"message": "SUCCESS"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=5000)