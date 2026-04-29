# Stock Prediction Web App 📈

A full-stack web application that predicts future stock prices using a Long Short-Term Memory (LSTM) deep learning model. The project combines React, Django, and machine learning to deliver stock trend forecasting with visualization.

---

## 🚀 Features
- 📊 Stock price prediction using LSTM model  
- 🌐 Responsive UI built with React  
- ⚙️ Django REST API for backend communication  
- 📉 Visualization of historical and predicted stock data  
- 🔄 End-to-end ML integration in a web application  

---

## 🛠 Tech Stack
- Frontend: React.js
- Backend: Django, Django REST Framework  
- Machine Learning: Python, TensorFlow/Keras, LSTM  
- Data Processing: Pandas, NumPy, Scikit-learn  

---

## 🧠 How It Works
- Historical stock data is collected and preprocessed  
- Data is converted into time-series sequences  
- LSTM model learns patterns from past stock behavior  
- Model predicts future stock prices  
- Predictions are sent to frontend via Django API  

---

## ⚙️ Setup

### Backend
```bash
cd backend
pip install -r requirements.txt
python manage.py runserver