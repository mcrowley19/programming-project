import pandas as pd
from flask_cors import CORS
from flask import Flask

# Imported display functions from display.py
from display import build_late_vs_ontime_fig 

app = Flask(__name__)

CORS(app)
DATA_FILE = './data/flightData.csv'

df = pd.read_csv(DATA_FILE)
""""
This code reads the csv file from the cleaned dataset and then it sets up API endpoints
"""


""""
Sample flight data dict for reference:

{
    "ARR_TIME": 1012.0,
    "CANCELLED": 0.0,
    "CRS_ARR_TIME": 1029,
    "CRS_DEP_TIME": 700,
    "DEP_TIME": 657.0,
    "DEST": "LAX",
    "DEST_CITY_NAME": "Los Angeles, CA",
    "DEST_STATE_ABR": "CA",
    "DEST_WAC": 91,
    "DISTANCE": 2475.0,
    "DIVERTED": 0.0,
    "FL_DATE": "1/1/2022 12:00:00 AM",
    "MKT_CARRIER": "AA",
    "MKT_CARRIER_FL_NUM": 1,
    "ORIGIN": "JFK",
    "ORIGIN_CITY_NAME": "New York, NY",
    "ORIGIN_STATE_ABR": "NY",
    "ORIGIN_WAC": 22
  },
"""
def airport_origin_filter(airport_code):
    """"
    This function returns a list of dicts. Each dict is a row with the correct airport code
    """
    airport_code_df = df[df["ORIGIN"] == airport_code]
    return airport_code_df.to_dict(orient="records")

def cancel_filter(state):
    """"
    This function returns a list of dicts. Each dict is a flight which is cancelled
    """
    return df[df["CANCELLED"] == int(state)].to_dict(orient="records")

@app.route('/day/<day>')
def date(day):
    """"
    When an API call is made to /day/DAY_TO_FIND it returns a list of flights (as dicts) that occured on that day
    There are 6 days in the dataset 1,2,3,4,5 and 6
    """
    day_df = df[df["FL_DATE"].str.split('/').str[1] == day]
    return day_df.to_dict(orient="records")
    
@app.route('/cancelled')
def cancelled():
    """"
    This returns a list of cancelled flights
    """
    cancelledFlights=cancel_filter(True)
    return cancelledFlights

@app.route('/charts/late-vs-ontime')
def late_vs_ontime_chart():
    fig = build_late_vs_ontime_fig()
    return fig

@app.route('/')
def home():
    return 'Flask API is running. Try /day/1'

if __name__ == '__main__':
    app.run(debug=True)