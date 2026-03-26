import pandas as pd
import plotly.express as px
import plotly.graph_objs as go
import json
from plotly.utils import PlotlyJSONEncoder

DATA_FILE = "data/flightDataCleaned.csv" # remarkable algorithm that finds the path


def build_late_vs_ontime_by_carrier_fig():
    df = pd.read_csv(DATA_FILE)

    grouped = (
        df.groupby("MKT_CARRIER")[["ON_TIME", "LATE"]]
        .sum()
        .reset_index()
    )

    fig = px.bar(
        grouped,
        x="MKT_CARRIER",
        y=["ON_TIME", "LATE"],
        barmode="group",
        title="On-Time vs Late Flights by Carrier",
        labels={"MKT_CARRIER": "Carrier", "value": "Flights", "variable": "Status"},
    )

    return json.dumps(fig, cls=PlotlyJSONEncoder)


def build_late_vs_ontime_by_day_fig():
    df = pd.read_csv(DATA_FILE)

    grouped = (
        df.groupby("FL_DATE")[["ON_TIME", "LATE"]]
        .sum()
        .reset_index()
    )

    fig = px.bar(
        grouped,
        x="FL_DATE",
        y=["ON_TIME", "LATE"],
        barmode="group",
        title="On-Time vs Late Flights by Day",
        labels={"DAY": "Day of Month", "value": "Flights", "variable": "Status"},
    )

    return json.dumps(fig, cls=PlotlyJSONEncoder)


def build_flights_per_hour_fig():
    df = pd.read_csv(DATA_FILE)

    df["DEP_HOUR"] = int((df["CRS_DEP_TIME"] // 100))

    grouped = (
        df.groupby("DEP_HOUR")
        .count()
        .reset_index()
    )

    fig = px.line(
        grouped,
        x="DEP_HOUR",
        y="FLIGHTS",
        title="Number of Flights Departing by Hour",
        labels={"DEP_HOUR": "Departure Hour", "FLIGHTS": "Number of Flights"},
    )

    return json.dumps(fig, cls=PlotlyJSONEncoder)


def build_top_ten_busiest_airports_fig():
    df=pd.read_csv(DATA_FILE)
    top10=df['ORIGIN'].value_counts().nlargest(10).reset_index()
    fig = px.bar(
        top10,
        x='ORIGIN', 
        y='count',
        title="Ten Busiest Airports by Departures" ,
        labels={'ORIGIN': 'Origin Airport', 'count': 'Number of Flights'},
    )
    return json.dumps(fig, cls=PlotlyJSONEncoder)

