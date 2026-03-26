import pandas as pd
from flask_cors import CORS
from flask import Flask, request, Response
import json
# Imported display functions from display.py
from display import *

app = Flask(__name__)

CORS(app)
DATA_FILE = './data/flightDataCleaned.csv'

""""
This code reads the csv file from the cleaned dataset and then it sets up API endpoints

API endpoints:
- /day/<day> - returns a list of flights (as dicts) that occured
- /day/<day>/dep-times - returns a list of unique departure times for the given day
- /cancelled - returns a list of cancelled flights

Endpoints for Charts:
- /charts/late-vs-ontime-carrier - returns a bar graph comparing late vs ontime flights by carrier
- /charts/late-vs-ontime-day - returns a bar graph comparing late vs ontime flights by day

In progress:
- /charts/busiest-airports - returns a bar graph of the airports with most flights in the dataset
- /charts/flights-by-hour - returns a line graph of the number of flights departing at each hour of the day

"""

df = pd.read_csv(DATA_FILE)
_fl_day = pd.to_datetime(df["FL_DATE"], format="%m/%d/%Y").dt.day



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

def _day_df(day):
    return df.loc[_fl_day == int(day)]

@app.route('/day/<day>/dep-times')
def day_dep_times(day):
    dep_times_int = _day_df(day)["DEP_TIME"].dropna().astype(int)
    unique_times = dep_times_int.unique()
    body = pd.Series(sorted(unique_times)).to_json(orient="values")
    return Response(body, mimetype="application/json")

@app.route('/day/<day>')
def date(day):
    """"
    When an API call is made to /day/DAY_TO_FIND it returns a list of flights (as dicts) that occured on that day
    There are 6 days in the dataset 1,2,3,4,5 and 6
    """
    day_flights = _day_df(day)
    requested_dep_time = request.args.get("dep_time", type=int)
    if requested_dep_time is not None:
        dep_int = day_flights["DEP_TIME"].fillna(-1).astype(int)
        day_flights = day_flights[dep_int == requested_dep_time]
    flight_records = day_flights.to_dict(orient="records")
    print(json.dumps(flight_records))
    return json.dumps(flight_records)
    
@app.route('/cancelled')
def cancelled():
    """"
    This returns a list of cancelled flights
    """
    cancelledFlights=cancel_filter(True)
    return cancelledFlights

@app.route('/charts/late-vs-ontime-carrier')
def late_vs_ontime_by_carrier_chart():
    fig = build_late_vs_ontime_by_carrier_fig()
    return fig

@app.route('/charts/late-vs-ontime-day')
def late_vs_ontime_by_day_chart():
    fig = build_late_vs_ontime_by_day_fig()
    return fig

@app.route('/charts/busiest-airports')
def flights_by_airport_chart():
    fig = build_top_ten_busiest_airports_fig()
    return fig

@app.route('/charts/flights-by-hour')
def flights_by_hour_graph():
    fig = build_flights_per_hour_fig()
    return fig

@app.route('/')
def home():
    return 'Flask API is running. Try /day/1'

if __name__ == '__main__':
    app.run(debug=True)