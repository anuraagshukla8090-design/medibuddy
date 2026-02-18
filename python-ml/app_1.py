# ============================================
# HEALTHGUARD AI - CLINICAL DESIGN
# Complete Multi-Page Health Risk Assessment
# ============================================

import streamlit as st
import pandas as pd
import numpy as np
import pickle
import plotly.graph_objects as go
import plotly.express as px
from datetime import datetime
import base64
from io import BytesIO

# ============================================
# PAGE CONFIG
# ============================================

st.set_page_config(
    page_title="HealthGuard AI - Health Risk Assessment",
    page_icon="🏥",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# ============================================
# CUSTOM CSS - CLEAN CLINICAL THEME
# ============================================

st.markdown("""
<style>
    /* Import Google Font */
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    
    /* Main Background */
    .stApp {
        background: #FFFFFF;
        font-family: 'Inter', sans-serif;
    }
    
    /* Hide Streamlit Elements */
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    header {visibility: hidden;}
    
    /* Navigation Bar */
    .navbar {
        background: #FFFFFF;
        padding: 1rem 2rem;
        box-shadow: 0 2px 10px rgba(0,0,0,0.08);
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: -3rem -5rem 2rem -5rem;
        position: sticky;
        top: 0;
        z-index: 999;
    }
    
    .nav-logo {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 1.5rem;
        font-weight: 700;
        color: #2D9CDB;
    }
    
    .nav-links {
        display: flex;
        gap: 2rem;
        margin: 0 auto;
    }
    
    .nav-link {
        color: #6C757D;
        text-decoration: none;
        font-weight: 500;
        transition: color 0.3s;
    }
    
    .nav-link:hover {
        color: #2D9CDB;
    }
    
    .nav-buttons {
        display: flex;
        gap: 1rem;
        align-items: center;
    }
    
    .nav-login {
        color: #2D9CDB;
        font-weight: 500;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.5rem 1rem;
    }
    
    .nav-signup {
        background: #2D9CDB;
        color: white;
        border: none;
        border-radius: 25px;
        padding: 0.5rem 1.5rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
    }
    
    .nav-signup:hover {
        background: #2583C4;
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(45, 156, 219, 0.3);
    }
    
    /* Card Styles */
    .card {
        background: white;
        border-radius: 20px;
        padding: 2rem;
        box-shadow: 0 5px 20px rgba(0,0,0,0.08);
        margin-bottom: 1.5rem;
        border: 1px solid #F0F0F0;
    }
    
    .metric-card {
        background: white;
        border-radius: 15px;
        padding: 1.5rem;
        box-shadow: 0 3px 15px rgba(0,0,0,0.06);
        border: 1px solid #F0F0F0;
        text-align: center;
        transition: all 0.3s;
    }
    
    .metric-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0,0,0,0.1);
    }
    
    .metric-icon {
        font-size: 2.5rem;
        margin-bottom: 0.5rem;
    }
    
    .metric-label {
        color: #6C757D;
        font-size: 0.9rem;
        font-weight: 500;
        margin-bottom: 0.5rem;
    }
    
    .metric-value {
        font-size: 2.5rem;
        font-weight: 700;
        color: #212529;
        line-height: 1;
    }
    
    .metric-trend {
        font-size: 0.85rem;
        font-weight: 600;
        margin-top: 0.5rem;
    }
    
    .trend-up {
        color: #28A745;
    }
    
    .trend-down {
        color: #DC3545;
    }
    
    /* Hero Section */
    .hero {
        text-align: center;
        padding: 4rem 2rem;
        background: linear-gradient(135deg, #E0F7FA 0%, #F1F8FF 100%);
        border-radius: 25px;
        margin-bottom: 3rem;
    }
    
    .hero h1 {
        font-size: 3rem;
        font-weight: 700;
        color: #212529;
        margin-bottom: 1rem;
    }
    
    .hero p {
        font-size: 1.2rem;
        color: #6C757D;
        margin-bottom: 2rem;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
    }
    
    /* Pill Buttons */
    .pill-button {
        background: #2D9CDB;
        color: white;
        border: none;
        border-radius: 25px;
        padding: 12px 30px;
        font-size: 1.1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
        display: inline-block;
        text-decoration: none;
    }
    
    .pill-button:hover {
        background: #2583C4;
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(45, 156, 219, 0.3);
    }
    
    .pill-button-secondary {
        background: white;
        color: #2D9CDB;
        border: 2px solid #2D9CDB;
    }
    
    .pill-button-secondary:hover {
        background: #F1F8FF;
    }
    
    /* Form Inputs */
    .stSelectbox > div > div {
        border-radius: 10px;
        border: 1px solid #E0E0E0;
    }
    
    .stSelectbox > div > div:focus-within {
        border-color: #2D9CDB;
        box-shadow: 0 0 0 2px rgba(45, 156, 219, 0.1);
    }
    
    .stNumberInput > div > div > input {
        border-radius: 10px;
        border: 1px solid #E0E0E0;
    }
    
    .stNumberInput > div > div > input:focus {
        border-color: #2D9CDB;
        box-shadow: 0 0 0 2px rgba(45, 156, 219, 0.1);
    }
    
    /* Risk Zone Badges */
    .risk-badge {
        display: inline-block;
        padding: 6px 15px;
        border-radius: 15px;
        font-size: 0.85rem;
        font-weight: 600;
    }
    
    .risk-low {
        background: #E8F5E9;
        color: #2E7D32;
    }
    
    .risk-moderate {
        background: #FFF3E0;
        color: #F57C00;
    }
    
    .risk-high {
        background: #FFEBEE;
        color: #C62828;
    }
    
    /* Spectrum Visualization */
    .spectrum-container {
        background: white;
        border-radius: 15px;
        padding: 1.5rem;
        box-shadow: 0 3px 15px rgba(0,0,0,0.06);
        margin: 1.5rem 0;
    }
    
    .spectrum-bar {
        height: 40px;
        background: linear-gradient(to right, 
            #28A745 0%, 
            #28A745 25%, 
            #FFC107 25%, 
            #FFC107 50%, 
            #FF9800 50%, 
            #FF9800 75%, 
            #DC3545 75%, 
            #DC3545 100%);
        border-radius: 20px;
        position: relative;
        margin: 1rem 0;
    }
    
    .spectrum-marker {
        position: absolute;
        top: -10px;
        width: 60px;
        height: 60px;
        background: white;
        border: 3px solid #2D9CDB;
        border-radius: 50%;
        box-shadow: 0 3px 10px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        color: #2D9CDB;
    }
    
    /* Zone labels */
    .zone-labels {
        display: flex;
        justify-content: space-between;
        margin-top: 0.5rem;
        font-size: 0.85rem;
        color: #6C757D;
    }
    
    /* Section Headers */
    .section-header {
        font-size: 1.8rem;
        font-weight: 700;
        color: #212529;
        margin: 2rem 0 1rem 0;
        text-align: center;
    }
    
    .section-subheader {
        font-size: 1rem;
        color: #6C757D;
        text-align: center;
        margin-bottom: 2rem;
    }
    
    /* Custom button override for Streamlit */
    .stButton > button {
        background: #2D9CDB;
        color: white;
        border: none;
        border-radius: 25px;
        padding: 12px 30px;
        font-weight: 600;
        transition: all 0.3s;
        width: 100%;
    }
    
    .stButton > button:hover {
        background: #2583C4;
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(45, 156, 219, 0.3);
    }
</style>
""", unsafe_allow_html=True)

# ============================================
# SESSION STATE INITIALIZATION
# ============================================

if 'page' not in st.session_state:
    st.session_state.page = 'welcome'

if 'user_data' not in st.session_state:
    st.session_state.user_data = {}

if 'predictions' not in st.session_state:
    st.session_state.predictions = {}

# ============================================
# LOAD MODELS
# ============================================


@st.cache_resource
def load_models():
    try:
        with open('diabetes_model.pkl', 'rb') as f:
            diabetes_model = pickle.load(f)
        with open('heart_model.pkl', 'rb') as f:
            heart_model = pickle.load(f)
        with open('scaler.pkl', 'rb') as f:
            scaler = pickle.load(f)
        return diabetes_model, heart_model, scaler
    except:
        st.error(
            "Model files not found! Please ensure .pkl files are in the same directory.")
        return None, None, None


diabetes_model, heart_model, scaler = load_models()

# ============================================
# NAVIGATION BAR
# ============================================


def render_navbar():
    st.markdown("""
    <div class="navbar">
        <div class="nav-logo">
            🏥 HealthGuard AI
        </div>
        <div class="nav-links">
            <a href="#" class="nav-link">Home</a>
            <a href="#" class="nav-link">About</a>
            <a href="#" class="nav-link">Contact</a>
        </div>
        <div class="nav-buttons">
            <button class="nav-login">Log In</button>
            <button class="nav-signup">Sign Up</button>
        </div>
    </div>
    """, unsafe_allow_html=True)

# ============================================
# PAGE 1: WELCOME
# ============================================


def page_welcome():
    render_navbar()

    # Hero Section
    st.markdown("""
    <div class="hero">
        <h1>Welcome to HealthGuard AI</h1>
        <p>AI-powered health risk assessment for diabetes and heart disease. 
        Get personalized insights in minutes.</p>
    </div>
    """, unsafe_allow_html=True)

    # Feature Cards
    col1, col2, col3 = st.columns(3)

    with col1:
        st.markdown("""
        <div class="metric-card">
            <div class="metric-icon">🔬</div>
            <div class="metric-label">Advanced AI</div>
            <p style="color: #6C757D; font-size: 0.9rem;">
                Machine learning models trained on 300,000+ health records
            </p>
        </div>
        """, unsafe_allow_html=True)

    with col2:
        st.markdown("""
        <div class="metric-card">
            <div class="metric-icon">🎯</div>
            <div class="metric-label">Dual Prediction</div>
            <p style="color: #6C757D; font-size: 0.9rem;">
                Simultaneous assessment for diabetes and heart disease
            </p>
        </div>
        """, unsafe_allow_html=True)

    with col3:
        st.markdown("""
        <div class="metric-card">
            <div class="metric-icon">💡</div>
            <div class="metric-label">Actionable Insights</div>
            <p style="color: #6C757D; font-size: 0.9rem;">
                Personalized recommendations to improve your health
            </p>
        </div>
        """, unsafe_allow_html=True)

    # Start Button
    st.markdown("<br><br>", unsafe_allow_html=True)
    col1, col2, col3 = st.columns([3, 2, 3])
    with col2:
        if st.button("🚀 Start Your Health Check", use_container_width=True):
            st.session_state.page = 'input'
            st.rerun()

# ============================================
# PAGE 2: INPUT FORM
# ============================================


def page_input():
    render_navbar()

    # Center the form
    col1, col2, col3 = st.columns([1, 3, 1])

    with col2:
        st.markdown(
            '<h2 class="section-header">📋 Your Health Information</h2>', unsafe_allow_html=True)
        st.markdown(
            '<p class="section-subheader">Complete the form below for accurate predictions</p>', unsafe_allow_html=True)

        # Form Card
        with st.container():
            st.markdown('<div class="card">', unsafe_allow_html=True)

            # Demographics
            st.markdown("### 👤 Demographics")
            col_a, col_b = st.columns(2)
            with col_a:
                sex = st.selectbox("Sex", ["Female", "Male"])
            with col_b:
                age_category = st.selectbox("Age Range", [
                    "18-24", "25-29", "30-34", "35-39", "40-44", "45-49",
                    "50-54", "55-59", "60-64", "65-69", "70-74", "75-79", "80+"
                ])

            st.markdown("---")

            # Physical Metrics
            st.markdown("### 📊 Physical Metrics")
            col_a, col_b = st.columns(2)
            with col_a:
                height = st.number_input("Height (cm)", 120, 220, 170)
            with col_b:
                weight = st.number_input("Weight (kg)", 30, 200, 70)

            bmi = weight / ((height / 100) ** 2)

            # BMI Display
            if bmi < 18.5:
                bmi_status = "Underweight"
                bmi_color = "#2D9CDB"
            elif bmi < 25:
                bmi_status = "Normal"
                bmi_color = "#28A745"
            elif bmi < 30:
                bmi_status = "Overweight"
                bmi_color = "#FFC107"
            else:
                bmi_status = "Obese"
                bmi_color = "#DC3545"

            st.markdown(f"""
            <div style="background: #F8F9FA; padding: 1rem; border-radius: 10px; text-align: center; margin: 1rem 0;">
                <span style="color: #6C757D;">Your BMI: </span>
                <span style="font-size: 1.5rem; font-weight: 700; color: {bmi_color};">{bmi:.1f}</span>
                <span style="color: {bmi_color}; font-weight: 600;"> ({bmi_status})</span>
            </div>
            """, unsafe_allow_html=True)

            st.markdown("---")

            # Health Status
            st.markdown("### 🩺 Health Status")
            col_a, col_b = st.columns(2)
            with col_a:
                general_health = st.selectbox("General Health",
                                              ["Poor", "Fair", "Good", "Very Good", "Excellent"])
            with col_b:
                checkup = st.selectbox("Last Medical Checkup", [
                    "Within the past year", "Within the past 2 years",
                    "Within the past 5 years", "5 or more years ago", "Never"
                ])

            st.markdown("---")

            # Lifestyle
            st.markdown("### 🏃 Lifestyle")
            col_a, col_b, col_c = st.columns(3)
            with col_a:
                exercise = st.selectbox("Regular Exercise?", ["Yes", "No"])
            with col_b:
                smoking = st.selectbox("Smoking History?", ["No", "Yes"])
            with col_c:
                alcohol = st.number_input("Drinks per week", 0, 30, 2)

            st.markdown("---")

            # Diet
            st.markdown("### 🥗 Diet")
            col_a, col_b, col_c = st.columns(3)
            with col_a:
                fruit = st.slider("Fruit (servings/month)", 0, 120, 30)
            with col_b:
                vegetables = st.slider(
                    "Vegetables (servings/month)", 0, 120, 20)
            with col_c:
                fried_potato = st.slider(
                    "Fried Food (servings/month)", 0, 60, 10)

            st.markdown("---")

            # Medical History
            st.markdown("### 📁 Medical History")
            col_a, col_b = st.columns(2)
            with col_a:
                depression = st.selectbox("Depression?", ["No", "Yes"])
                arthritis = st.selectbox("Arthritis?", ["No", "Yes"])
            with col_b:
                skin_cancer = st.selectbox("Skin Cancer?", ["No", "Yes"])
                other_cancer = st.selectbox("Other Cancer?", ["No", "Yes"])

            st.markdown("</div>", unsafe_allow_html=True)

            # Submit Button
            st.markdown("<br>", unsafe_allow_html=True)
            if st.button("🔍 Analyze My Health", use_container_width=True):
                # Store user data
                st.session_state.user_data = {
                    'sex': sex, 'age_category': age_category,
                    'height': height, 'weight': weight, 'bmi': bmi,
                    'general_health': general_health, 'checkup': checkup,
                    'exercise': exercise, 'smoking': smoking, 'alcohol': alcohol,
                    'fruit': fruit, 'vegetables': vegetables, 'fried_potato': fried_potato,
                    'depression': depression, 'arthritis': arthritis,
                    'skin_cancer': skin_cancer, 'other_cancer': other_cancer
                }

                # Encode and predict
                health_map = {'Poor': 1, 'Fair': 2,
                              'Good': 3, 'Very Good': 4, 'Excellent': 5}
                checkup_map = {'Never': 0, '5 or more years ago': 1, 'Within the past 5 years': 2,
                               'Within the past 2 years': 3, 'Within the past year': 4}
                age_map = {'18-24': 1, '25-29': 2, '30-34': 3, '35-39': 4, '40-44': 5, '45-49': 6,
                           '50-54': 7, '55-59': 8, '60-64': 9, '65-69': 10, '70-74': 11, '75-79': 12, '80+': 13}

                features = np.array([[
                    health_map[general_health],
                    checkup_map[checkup],
                    1 if exercise == "Yes" else 0,
                    1 if skin_cancer == "Yes" else 0,
                    1 if other_cancer == "Yes" else 0,
                    1 if depression == "Yes" else 0,
                    1 if arthritis == "Yes" else 0,
                    1 if sex == "Male" else 0,
                    age_map[age_category],
                    height, weight, bmi,
                    1 if smoking == "Yes" else 0,
                    alcohol, fruit, vegetables, fried_potato
                ]])

                if scaler is not None:
                    features_scaled = scaler.transform(features)
                    dia_prob = diabetes_model.predict_proba(features_scaled)[
                        0][1] * 100
                    heart_prob = heart_model.predict_proba(features_scaled)[
                        0][1] * 100

                    st.session_state.predictions = {
                        'diabetes': dia_prob,
                        'heart': heart_prob,
                        'features': features,
                        'features_scaled': features_scaled
                    }

                    st.session_state.page = 'results'
                    st.rerun()

# ============================================
# PAGE 3: RESULTS
# ============================================


def page_results():
    render_navbar()

    if 'predictions' not in st.session_state or not st.session_state.predictions:
        st.error("No predictions found. Please complete the health assessment first.")
        if st.button("← Back to Assessment"):
            st.session_state.page = 'input'
            st.rerun()
        return

    pred = st.session_state.predictions
    dia_risk = pred['diabetes']
    heart_risk = pred['heart']

    st.markdown('<h2 class="section-header">📊 Your Health Risk Assessment</h2>',
                unsafe_allow_html=True)

    # Risk Scores
    col1, col2, col3 = st.columns(3)

    # Diabetes Card
    with col1:
        dia_level = "Low" if dia_risk < 25 else (
            "Moderate" if dia_risk < 55 else "High")
        dia_color = "#28A745" if dia_risk < 25 else (
            "#FFC107" if dia_risk < 55 else "#DC3545")
        st.markdown(f"""
        <div class="metric-card">
            <div class="metric-icon">🩸</div>
            <div class="metric-label">Diabetes Risk</div>
            <div class="metric-value" style="color: {dia_color};">{dia_risk:.1f}%</div>
            <div class="risk-badge risk-{dia_level.lower()}">{dia_level} Risk</div>
        </div>
        """, unsafe_allow_html=True)

    # Heart Disease Card
    with col2:
        heart_level = "Low" if heart_risk < 25 else (
            "Moderate" if heart_risk < 55 else "High")
        heart_color = "#28A745" if heart_risk < 25 else (
            "#FFC107" if heart_risk < 55 else "#DC3545")
        st.markdown(f"""
        <div class="metric-card">
            <div class="metric-icon">❤️</div>
            <div class="metric-label">Heart Disease Risk</div>
            <div class="metric-value" style="color: {heart_color};">{heart_risk:.1f}%</div>
            <div class="risk-badge risk-{heart_level.lower()}">{heart_level} Risk</div>
        </div>
        """, unsafe_allow_html=True)

    # Health Score
    with col3:
        health_score = 100 - (dia_risk + heart_risk) / 2
        score_color = "#28A745" if health_score > 70 else (
            "#FFC107" if health_score > 40 else "#DC3545")
        st.markdown(f"""
        <div class="metric-card">
            <div class="metric-icon">💪</div>
            <div class="metric-label">Health Score</div>
            <div class="metric-value" style="color: {score_color};">{health_score:.0f}</div>
            <div class="risk-badge">out of 100</div>
        </div>
        """, unsafe_allow_html=True)

    # Health Spectrum Visualization
    st.markdown('<h3 style="text-align: center; margin-top: 2rem;">How Close Are You to Disease Profiles?</h3>',
                unsafe_allow_html=True)

    col1, col2 = st.columns(2)

    with col1:
        # Diabetes Spectrum
        st.markdown("""<div class="spectrum-container">
            <h4 style="text-align: center;">🩸 Diabetes Spectrum</h4>""", unsafe_allow_html=True)

        # Calculate position
        healthy_baseline = 10
        diabetic_baseline = 75
        dia_position = ((dia_risk - healthy_baseline) /
                        (diabetic_baseline - healthy_baseline)) * 100
        dia_position = max(0, min(100, dia_position))  # Clamp between 0-100

        # Spectrum bar with marker
        st.markdown(f"""
        <div class="spectrum-bar">
            <div class="spectrum-marker" style="left: calc({dia_position}% - 30px);">
                YOU
            </div>
        </div>
        <div class="zone-labels">
            <span>🟢 Safe</span>
            <span>🟡 Caution</span>
            <span>🟠 Warning</span>
            <span>🔴 Danger</span>
        </div>
        """, unsafe_allow_html=True)

        if dia_position < 25:
            message = "✅ You're in the SAFE ZONE - far from diabetic profiles"
        elif dia_position < 50:
            message = "⚠️ You're in the CAUTION ZONE - some risk factors present"
        elif dia_position < 75:
            message = "⚠️ You're in the WARNING ZONE - approaching diabetic patterns"
        else:
            message = "🚨 You're in the DANGER ZONE - matching diabetic profiles"

        st.markdown(
            f"<p style='text-align: center; margin-top: 1rem;'>{message}</p>", unsafe_allow_html=True)
        st.markdown("</div>", unsafe_allow_html=True)

    with col2:
        # Heart Disease Spectrum
        st.markdown("""<div class="spectrum-container">
            <h4 style="text-align: center;">❤️ Heart Disease Spectrum</h4>""", unsafe_allow_html=True)

        # Calculate position
        heart_position = ((heart_risk - healthy_baseline) /
                          (diabetic_baseline - healthy_baseline)) * 100
        heart_position = max(0, min(100, heart_position))

        # Spectrum bar with marker
        st.markdown(f"""
        <div class="spectrum-bar">
            <div class="spectrum-marker" style="left: calc({heart_position}% - 30px);">
                YOU
            </div>
        </div>
        <div class="zone-labels">
            <span>🟢 Safe</span>
            <span>🟡 Caution</span>
            <span>🟠 Warning</span>
            <span>🔴 Danger</span>
        </div>
        """, unsafe_allow_html=True)

        if heart_position < 25:
            message = "✅ You're in the SAFE ZONE - far from heart disease profiles"
        elif heart_position < 50:
            message = "⚠️ You're in the CAUTION ZONE - some risk factors present"
        elif heart_position < 75:
            message = "⚠️ You're in the WARNING ZONE - approaching heart disease patterns"
        else:
            message = "🚨 You're in the DANGER ZONE - matching heart disease profiles"

        st.markdown(
            f"<p style='text-align: center; margin-top: 1rem;'>{message}</p>", unsafe_allow_html=True)
        st.markdown("</div>", unsafe_allow_html=True)

    # Charts
    st.markdown('<h3 style="text-align: center; margin-top: 2rem;">Risk Comparison</h3>',
                unsafe_allow_html=True)

    # Create comparison chart
    fig = go.Figure()

    # Add bars for average healthy, user, average diseased
    categories = ['Diabetes', 'Heart Disease']
    avg_healthy = [10, 8]
    user_scores = [dia_risk, heart_risk]
    avg_diseased = [75, 70]

    fig.add_trace(go.Bar(name='Average Healthy', x=categories, y=avg_healthy,
                         marker_color='#28A745', opacity=0.7))
    fig.add_trace(go.Bar(name='You', x=categories, y=user_scores,
                         marker_color='#2D9CDB'))
    fig.add_trace(go.Bar(name='Average Diseased', x=categories, y=avg_diseased,
                         marker_color='#DC3545', opacity=0.7))

    fig.update_layout(
        barmode='group',
        plot_bgcolor='white',
        paper_bgcolor='white',
        font=dict(family="Inter", size=12),
        height=400,
        yaxis=dict(title="Risk Score (%)", range=[
                   0, 100], gridcolor='#F0F0F0'),
        xaxis=dict(gridcolor='#F0F0F0'),
        legend=dict(orientation="h", y=1.1, x=0.5, xanchor="center")
    )

    st.plotly_chart(fig, use_container_width=True)

    # Navigation buttons
    col1, col2, col3 = st.columns([1, 1, 1])
    with col2:
        if st.button("🎯 Try Lifestyle Simulator", use_container_width=True):
            st.session_state.page = 'simulator'
            st.rerun()

# ============================================
# PAGE 4: LIFESTYLE SIMULATOR
# ============================================


def page_simulator():
    render_navbar()

    if 'predictions' not in st.session_state or not st.session_state.predictions:
        st.error("Please complete the health assessment first.")
        if st.button("← Back to Assessment"):
            st.session_state.page = 'input'
            st.rerun()
        return

    st.markdown('<h2 class="section-header">🎯 Lifestyle Impact Simulator</h2>',
                unsafe_allow_html=True)
    st.markdown('<p class="section-subheader">See how lifestyle changes affect your health risks</p>',
                unsafe_allow_html=True)

    # Current risks
    current_dia = st.session_state.predictions['diabetes']
    current_heart = st.session_state.predictions['heart']

    # Simulator controls
    col1, col2 = st.columns(2)

    with col1:
        st.markdown("### 🎮 Adjust Your Lifestyle")

        weight_loss = st.slider("Weight Loss (kg)", 0, 20, 0, key="sim_weight")

        exercise_change = st.selectbox("Exercise Frequency",
                                       ["Keep Current", "Start Exercising (3x/week)", "Daily Exercise"], key="sim_exercise")

        quit_smoking = st.selectbox("Smoking",
                                    ["Keep Current", "Quit Smoking"], key="sim_smoking")

        diet_change = st.selectbox("Diet Quality",
                                   ["Keep Current", "Improve Diet", "Optimal Diet"], key="sim_diet")

    # Calculate new predictions
    modified_features = st.session_state.predictions['features'].copy()

    # Apply changes
    if weight_loss > 0:
        new_bmi = st.session_state.user_data['bmi'] - (weight_loss * 0.35)
        modified_features[0][11] = max(new_bmi, 18)

    if exercise_change == "Start Exercising (3x/week)":
        modified_features[0][2] = 1
    elif exercise_change == "Daily Exercise":
        modified_features[0][2] = 1

    if quit_smoking == "Quit Smoking" and st.session_state.user_data.get('smoking') == "Yes":
        modified_features[0][12] = 0

    if diet_change == "Improve Diet":
        modified_features[0][14] = min(modified_features[0][14] + 20, 100)
        modified_features[0][15] = min(modified_features[0][15] + 15, 100)
        modified_features[0][16] = max(modified_features[0][16] - 10, 0)
    elif diet_change == "Optimal Diet":
        modified_features[0][14] = 60
        modified_features[0][15] = 60
        modified_features[0][16] = 5

    # Get new predictions
    if scaler is not None:
        modified_scaled = scaler.transform(modified_features)
        new_dia = diabetes_model.predict_proba(modified_scaled)[0][1] * 100
        new_heart = heart_model.predict_proba(modified_scaled)[0][1] * 100
    else:
        new_dia = current_dia
        new_heart = current_heart

    with col2:
        st.markdown("### 📊 Projected Impact")

        # Diabetes impact
        dia_change = new_dia - current_dia
        dia_color = "#28A745" if dia_change < 0 else "#DC3545"
        st.markdown(f"""
        <div class="card">
            <h4>🩸 Diabetes Risk</h4>
            <div style="display: flex; align-items: center; justify-content: space-around;">
                <div>
                    <p style="color: #6C757D; margin: 0;">Current</p>
                    <p style="font-size: 1.8rem; font-weight: 700; margin: 0;">{current_dia:.1f}%</p>
                </div>
                <div style="font-size: 2rem; color: #6C757D;">→</div>
                <div>
                    <p style="color: #6C757D; margin: 0;">New</p>
                    <p style="font-size: 1.8rem; font-weight: 700; margin: 0; color: {dia_color};">{new_dia:.1f}%</p>
                </div>
            </div>
            <p style="text-align: center; margin-top: 1rem; font-weight: 600; color: {dia_color};">
                {dia_change:+.1f}% change
            </p>
        </div>
        """, unsafe_allow_html=True)

        # Heart disease impact
        heart_change = new_heart - current_heart
        heart_color = "#28A745" if heart_change < 0 else "#DC3545"
        st.markdown(f"""
        <div class="card">
            <h4>❤️ Heart Disease Risk</h4>
            <div style="display: flex; align-items: center; justify-content: space-around;">
                <div>
                    <p style="color: #6C757D; margin: 0;">Current</p>
                    <p style="font-size: 1.8rem; font-weight: 700; margin: 0;">{current_heart:.1f}%</p>
                </div>
                <div style="font-size: 2rem; color: #6C757D;">→</div>
                <div>
                    <p style="color: #6C757D; margin: 0;">New</p>
                    <p style="font-size: 1.8rem; font-weight: 700; margin: 0; color: {heart_color};">{new_heart:.1f}%</p>
                </div>
            </div>
            <p style="text-align: center; margin-top: 1rem; font-weight: 600; color: {heart_color};">
                {heart_change:+.1f}% change
            </p>
        </div>
        """, unsafe_allow_html=True)

    # Visualization
    st.markdown("### 📈 Before vs After Comparison")

    fig = go.Figure()
    fig.add_trace(go.Bar(name='Current Risk', x=['Diabetes', 'Heart Disease'],
                         y=[current_dia, current_heart],
                         marker_color='#DC3545', opacity=0.7))
    fig.add_trace(go.Bar(name='After Changes', x=['Diabetes', 'Heart Disease'],
                         y=[new_dia, new_heart],
                         marker_color='#28A745', opacity=0.9))

    fig.update_layout(
        barmode='group',
        plot_bgcolor='white',
        paper_bgcolor='white',
        font=dict(family="Inter", size=12),
        height=400,
        yaxis=dict(title="Risk (%)", range=[0, 100], gridcolor='#F0F0F0'),
        xaxis=dict(gridcolor='#F0F0F0'),
        legend=dict(orientation="h", y=1.1, x=0.5, xanchor="center")
    )

    st.plotly_chart(fig, use_container_width=True)

    # Save simulation data for report
    st.session_state.simulation = {
        'original_dia': current_dia,
        'original_heart': current_heart,
        'new_dia': new_dia,
        'new_heart': new_heart,
        'changes': {
            'weight_loss': weight_loss,
            'exercise': exercise_change,
            'quit_smoking': quit_smoking,
            'diet': diet_change
        }
    }

    # Navigation
    col1, col2, col3 = st.columns([1, 1, 1])
    with col2:
        if st.button("📥 Generate Report", use_container_width=True):
            st.session_state.page = 'report'
            st.rerun()

# ============================================
# PAGE 5: REPORT
# ============================================


def page_report():
    render_navbar()

    if 'predictions' not in st.session_state:
        st.error("Please complete the assessment first.")
        if st.button("← Back to Assessment"):
            st.session_state.page = 'input'
            st.rerun()
        return

    st.markdown('<h2 class="section-header">📄 Your Health Report</h2>',
                unsafe_allow_html=True)
    st.markdown('<p class="section-subheader">Download your personalized health assessment</p>',
                unsafe_allow_html=True)

    # Report preview
    col1, col2, col3 = st.columns([1, 2, 1])

    with col2:
        st.markdown("""
        <div class="card">
            <h3 style="text-align: center;">Health Risk Assessment Report</h3>
            <hr>
            <p><strong>Date:</strong> """ + datetime.now().strftime("%B %d, %Y") + """</p>
            <p><strong>Patient ID:</strong> Anonymous</p>
            
            <h4>Risk Summary</h4>
            <ul>
                <li>Diabetes Risk: """ + f"{st.session_state.predictions['diabetes']:.1f}%" + """</li>
                <li>Heart Disease Risk: """ + f"{st.session_state.predictions['heart']:.1f}%" + """</li>
                <li>Overall Health Score: """ + f"{100 - (st.session_state.predictions['diabetes'] + st.session_state.predictions['heart'])/2:.0f}/100" + """</li>
            </ul>
            
            <h4>Key Recommendations</h4>
            <ul>
                <li>Regular exercise (minimum 150 minutes/week)</li>
                <li>Maintain healthy BMI (18.5-24.9)</li>
                <li>Balanced diet with fruits and vegetables</li>
                <li>Regular health checkups</li>
            </ul>
            
            <p style="text-align: center; color: #6C757D; margin-top: 2rem;">
                <em>This report is for educational purposes only. Consult a healthcare professional for medical advice.</em>
            </p>
        </div>
        """, unsafe_allow_html=True)

        # Download button (visual only for now)
        st.markdown("<br>", unsafe_allow_html=True)
        if st.button("📥 Download PDF Report", use_container_width=True):
            st.success("Report downloaded successfully! (Demo)")

        st.markdown("<br>", unsafe_allow_html=True)
        if st.button("🏠 Start New Assessment", use_container_width=True):
            # Clear session state
            st.session_state.page = 'welcome'
            st.session_state.user_data = {}
            st.session_state.predictions = {}
            st.rerun()

# ============================================
# MAIN APP ROUTER
# ============================================


def main():
    # Route to appropriate page
    if st.session_state.page == 'welcome':
        page_welcome()
    elif st.session_state.page == 'input':
        page_input()
    elif st.session_state.page == 'results':
        page_results()
    elif st.session_state.page == 'simulator':
        page_simulator()
    elif st.session_state.page == 'report':
        page_report()


if __name__ == "__main__":
    main()
