from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import joblib
import numpy as np
import os

app = Flask(__name__, static_folder='frontend')
CORS(app)

# Load trained model
model = joblib.load('model.pkl')

# ================= HOME =================

@app.route('/')
def home():
    return send_from_directory('frontend', 'index.html')

# ================= PREDICT API =================

@app.route('/predict', methods=['POST'])
def predict():

    try:
        data = request.get_json()

        hour = float(data['hour'])
        vehicle_count = float(data['vehicle_count'])
        speed = float(data['speed'])

        features = np.array([[hour, vehicle_count, speed]])

        prediction = model.predict(features)[0]

        if prediction > 75:
            status = 'Heavy Traffic'
            message = 'High congestion detected in this area.'

        elif prediction > 40:
            status = 'Moderate Traffic'
            message = 'Traffic is moving at a normal pace.'

        else:
            status = 'Low Traffic'
            message = 'Roads are mostly clear with low congestion.'

        return jsonify({
            'prediction': round(float(prediction), 2),
            'status': status,
            'message': message
        })

    except Exception as e:
        return jsonify({'error': str(e)})

# ================= STATIC FILES =================

@app.route('/<path:path>')
def static_files(path):
    return send_from_directory('frontend', path)

# ================= RUN APP =================

if __name__ == '__main__':
    app.run(debug=True)
```

---

# train_model.py

```python
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error
import joblib

# Load dataset
file = pd.read_csv('traffic.csv')

# Features and target
X = file[['hour', 'vehicle_count', 'speed']]
y = file['traffic_density']

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# Model
model = RandomForestRegressor(
    n_estimators=100,
    random_state=42
)

# Train
model.fit(X_train, y_train)

# Predict
pred = model.predict(X_test)

# Accuracy
mae = mean_absolute_error(y_test, pred)

print('Model trained successfully')
print('MAE:', mae)

# Save model
joblib.dump(model, 'model.pkl')

print('Model saved as model.pkl')
```

---

# script.js

```javascript
const loginPage = document.getElementById("loginPage");
const signupPage = document.getElementById("signupPage");
const trafficPage = document.getElementById("trafficPage");
const dashboardPage = document.getElementById("dashboardPage");

// ================= AUTH =================

document.getElementById("showSignup").onclick = () => {
  loginPage.classList.remove("active-page");
  signupPage.classList.add("active-page");
};

document.getElementById("showLogin").onclick = () => {
  signupPage.classList.remove("active-page");
  loginPage.classList.add("active-page");
};

// ================= LOGIN =================

document.getElementById("loginForm").addEventListener("submit", (e) => {

  e.preventDefault();

  loginPage.classList.remove("active-page");
  trafficPage.classList.add("active-page");
});

// ================= SIGNUP =================

document.getElementById("signupForm").addEventListener("submit", (e) => {

  e.preventDefault();

  signupPage.classList.remove("active-page");
  loginPage.classList.add("active-page");

  alert("Account Created Successfully!");
});

// ================= TRAFFIC PREDICTION =================

const form = document.getElementById("trafficForm");

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const hour = document.getElementById("hour").value;
  const vehicle = document.getElementById("vehicle").value;
  const speed = document.getElementById("speed").value;

  const response = await fetch('/predict', {

    method: 'POST',

    headers: {
      'Content-Type': 'application/json'
    },

    body: JSON.stringify({
      hour: hour,
      vehicle_count: vehicle,
      speed: speed
    })
  });

  const data = await response.json();

  // Update Prediction UI
  document.getElementById("trafficStatus").innerText =
    data.status;

  document.getElementById("resultMessage").innerText =
    data.message;

  // Density Meter
  document.getElementById("densityValue").innerText =
    data.prediction + "%";

  document.getElementById("meterFill").style.width =
    data.prediction + "%";

  // Dashboard Stats
  updateDashboard(data.prediction);
});

// ================= DASHBOARD =================

function updateDashboard(prediction){

  document.getElementById("dashboardDensity").innerText =
    prediction + "%";

  document.getElementById("dashboardVehicles").innerText =
    Math.floor(prediction * 5 + 100);

  document.getElementById("dashboardSpeed").innerText =
    Math.floor(80 - prediction / 2) + " km/h";

  document.getElementById("dashboardAlerts").innerText =
    prediction > 70 ? "5" : "1";
}

// ================= NAVIGATION =================

document.getElementById("goDashboard").onclick = () => {

  trafficPage.classList.remove("active-page");
  dashboardPage.classList.add("active-page");
};

// ================= LOGOUT =================

document.getElementById("logoutBtn").onclick = () => {

  dashboardPage.classList.remove("active-page");
  loginPage.classList.add("active-page");
};

// ================= BUTTON ANIMATION =================

document.querySelectorAll("button").forEach((btn)=>{

  btn.addEventListener("mouseenter",()=>{
    btn.style.transform = "scale(1.03)";
  });

  btn.addEventListener("mouseleave",()=>{
    btn.style.transform = "scale(1)";
  });
});