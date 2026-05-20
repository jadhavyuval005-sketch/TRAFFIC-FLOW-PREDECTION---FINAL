import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error
import joblib

file = pd.read_csv('traffic.csv')

X = file[['hour', 'vehicle_count', 'speed']]
y = file['traffic_density']

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

model = RandomForestRegressor(n_estimators=100)

model.fit(X_train, y_train)

pred = model.predict(X_test)

mae = mean_absolute_error(y_test, pred)

print('Model trained successfully')
print('MAE:', mae)

joblib.dump(model, 'model.pkl')

print('Model saved as model.pkl')