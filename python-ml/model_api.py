from fastapi import FastAPI
import joblib
import pandas as pd
from google import genai
from google.genai import types
import os
from fastapi.middleware.cors import CORSMiddleware


# Set API key
client = genai.Client(api_key="AIzaSyAql63v7T8MJPvKfBGYBn6XECJrWnzg2C4")


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # your frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# ==============================
# Load Models
# ==============================
heart_model = joblib.load("models/heart_model.pkl")
scaler = joblib.load("models/scaler.pkl")
feature_columns = joblib.load("models/feature_columns.pkl")


# ==============================
# HEART PREDICTION API
# ==============================
@app.post("/predict/heart")
def predict_heart(data: dict):


    # ---------------------------------
    # Prepare full feature dictionary
    # ---------------------------------
    full_data = {col: 0 for col in feature_columns}

    # -------- Height & Weight --------
    height = data.get("height", 0)
    weight = data.get("weight", 0)

    full_data["Height_(cm)"] = height
    full_data["Weight_(kg)"] = weight

    height_m = height / 100 if height else 0
    bmi = weight / (height_m ** 2) if height_m > 0 else 0
    full_data["BMI"] = bmi

    # -------- Lifestyle Encodings --------
    full_data["Exercise_enc"] = 1 if data.get("exercise") == "Yes" else 0
    full_data["Depression_enc"] = 1 if data.get("depression") == "Yes" else 0
    full_data["Skin_Cancer_enc"] = 1 if data.get("skinCancer") == "Yes" else 0
    full_data["Other_Cancer_enc"] = 1 if data.get("otherCancer") == "Yes" else 0
    full_data["Arthritis_enc"] = 1 if data.get("arthritis") == "Yes" else 0
    full_data["Smoking_History_enc"] = 1 if data.get("smoking") == "Yes" else 0

    # -------- Diet --------
    full_data["Fruit_Consumption"] = data.get("fruitServings", 0)
    full_data["FriedPotato_Consumption"] = data.get("friedFoodServings", 0)
    full_data["Alcohol_Consumption"] = data.get("drinksPerWeek", 0)

    # -------- Basic Encodings --------
    full_data["Sex_enc"] = 1 if data.get("sex") == "Male" else 0

    age_map = {
        "18-24": 1, "25-29": 2, "30-34": 3, "35-39": 4,
        "40-44": 5, "45-49": 6, "50-54": 7, "55-59": 8,
        "60-64": 9, "65-69": 10, "70-74": 11, "75-79": 12,
        "80+": 13
    }

    full_data["Age_enc"] = age_map.get(data.get("ageRange"), 0)

    # ---------------------------------
    # Model Prediction
    # ---------------------------------
    df = pd.DataFrame([full_data])
    df_scaled = scaler.transform(df)

    prediction = heart_model.predict(df_scaled)
    probability = heart_model.predict_proba(df_scaled)

    risk_percent = float(probability[0][1] * 100)
    confidence = float(max(probability[0]) * 100)

    # ---------------------------------
    # Risk Category
    # ---------------------------------
    if risk_percent < 30:
        risk_category = "Low"
        risk_color = "green"
    elif risk_percent < 60:
        risk_category = "Moderate"
        risk_color = "orange"
    else:
        risk_category = "High"
        risk_color = "red"

    # Severity Text
    if risk_percent < 20:
        severity_text = "Very Low Risk"
    elif risk_percent < 40:
        severity_text = "Low Risk"
    elif risk_percent < 60:
        severity_text = "Moderate Risk"
    elif risk_percent < 80:
        severity_text = "High Risk"
    else:
        severity_text = "Critical Risk"

    # ---------------------------------
    # Health Score
    # ---------------------------------
    health_score = round(100 - risk_percent, 2)

    if health_score > 80:
        health_level = "Excellent"
    elif health_score > 60:
        health_level = "Good"
    elif health_score > 40:
        health_level = "Average"
    else:
        health_level = "Poor"

    # ---------------------------------
    # Lifestyle Score
    # ---------------------------------
    lifestyle_score = 100

    if data.get("smoking") == "Yes":
        lifestyle_score -= 20
    if data.get("exercise") == "No":
        lifestyle_score -= 15
    if bmi > 25:
        lifestyle_score -= 15
    if data.get("depression") == "Yes":
        lifestyle_score -= 10

    lifestyle_score = max(lifestyle_score, 0)

    # ---------------------------------
    # Ideal Weight Range
    # ---------------------------------
    ideal_min_weight = round((18.5 * (height_m ** 2)), 1) if height_m > 0 else 0
    ideal_max_weight = round((24.9 * (height_m ** 2)), 1) if height_m > 0 else 0

    # ---------------------------------
    # Risk Factors
    # ---------------------------------
    risk_factors = []

    if data.get("smoking") == "Yes":
        risk_factors.append("Smoking")
    if data.get("exercise") == "No":
        risk_factors.append("Lack of Exercise")
    if bmi > 25:
        risk_factors.append("High BMI")
    if data.get("depression") == "Yes":
        risk_factors.append("Depression")

    # ---------------------------------
    # Recommendations
    # ---------------------------------
    recommendations = []

    if data.get("smoking") == "Yes":
        recommendations.append("Consider quitting smoking.")
    if bmi > 25:
        recommendations.append("Maintain healthy weight through diet and exercise.")
    if data.get("exercise") == "No":
        recommendations.append("Increase physical activity to at least 30 minutes daily.")
    if risk_category == "High":
        recommendations.append("Consult a healthcare professional for further evaluation.")

    # ---------------------------------
    # Final Response
    # ---------------------------------
    return {
        "prediction": int(prediction[0]),
        "risk_percent": round(risk_percent, 2),
        "risk_category": risk_category,
        "risk_color": risk_color,
        "severity_text": severity_text,
        "confidence": round(confidence, 2),
        "bmi": round(bmi, 2),
        "health_score": health_score,
        "health_level": health_level,
        "lifestyle_score": lifestyle_score,
        "ideal_weight_range": {
            "min": ideal_min_weight,
            "max": ideal_max_weight
        },
        "risk_factors": risk_factors,
        "recommendations": recommendations
    }


from pydantic import BaseModel

class ChatRequest(BaseModel):
    message: str   # must match frontend

@app.post("/chat")
async def chat(data: ChatRequest):
    user_message = data.message

    response = client.models.generate_content(
        model="gemini-1.5-flash",
        contents=user_message
    )

    return {"reply": response.text}
