import joblib
import pandas as pd

# Load model files
heart_model = joblib.load("models/heart_model.pkl")
scaler = joblib.load("models/scaler.pkl")
feature_columns = joblib.load("models/feature_columns.pkl")

print("Models loaded successfully")

# Create dummy input data (all zeros)
dummy_data = {col: 0 for col in feature_columns}

df = pd.DataFrame([dummy_data])
df_scaled = scaler.transform(df)

prediction = heart_model.predict(df_scaled)



print("Prediction output:", prediction)
