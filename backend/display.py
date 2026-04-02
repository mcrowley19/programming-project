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
        width = 1200,
        color_discrete_sequence=["#009200", "#BC0000"],
        height = 500
    )
    fig.update_layout(      
        plot_bgcolor='rgba(0,0,0,0)',
        paper_bgcolor= 'rgba(0,0,0,0)',
        font=dict(color="white"), 
        title_font=dict(color="white"),
        xaxis=dict(title_font=dict(color="white"), tickfont=dict(color="white")),
        yaxis=dict(title_font=dict(color="white"), tickfont=dict(color="white")),
        legend=dict(font=dict(color="white"))
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
        width = 1200,
        color_discrete_sequence=["#009200", "#BC0000"],
        height = 500
    )
    fig.update_layout(      
        plot_bgcolor='rgba(0,0,0,0)',
        paper_bgcolor= 'rgba(0,0,0,0)',
        font=dict(color="white"), 
        title_font=dict(color="white"),
        xaxis=dict(title_font=dict(color="white"), tickfont=dict(color="white")),
        yaxis=dict(title_font=dict(color="white"), tickfont=dict(color="white")),
        legend=dict(font=dict(color="white"))
    )
    return json.dumps(fig, cls=PlotlyJSONEncoder)


def build_flights_per_hour_fig():
    df = pd.read_csv(DATA_FILE)

    df["DEP_HOUR"] = ((df["CRS_DEP_TIME"] // 100).astype(int))

    grouped = (
        df.groupby("DEP_HOUR").size()
        .reset_index(name="FLIGHTS")
    )

    fig = px.line(
        grouped,
        x="DEP_HOUR",
        y="FLIGHTS",
        title="Number of Flights Departing by Hour",
        labels={"DEP_HOUR": "Departure Hour", "FLIGHTS": "Number of Flights"},
    )
    fig.update_layout(      
        plot_bgcolor='rgba(0,0,0,0)',
        paper_bgcolor= 'rgba(0,0,0,0)',
        font=dict(color="white"), 
        title_font=dict(color="white"),
        xaxis=dict(title_font=dict(color="white"), tickfont=dict(color="white")),
        yaxis=dict(title_font=dict(color="white"), tickfont=dict(color="white")),
        legend=dict(font=dict(color="white"))
    )
        
    
    return json.dumps(fig, cls=PlotlyJSONEncoder)


def build_top_100_busiest_airports_fig():
    df=pd.read_csv(DATA_FILE)
    top100=df['ORIGIN'].value_counts().nlargest(100).reset_index()
    
    fig = px.bar(
        top100,
        x='ORIGIN', 
        y='count',
        title="Top 100 Busiest Airports by Departures" ,
        labels={'ORIGIN': 'Origin Airport', 'count': 'Number of Flights'},
        color_continuous_scale='Inferno',
        color='count'
    )
    fig.update_layout(      
        plot_bgcolor='rgba(0,0,0,0)',
        paper_bgcolor= 'rgba(0,0,0,0)',
        font=dict(color="white"), 
        title_font=dict(color="white"),
        xaxis=dict(title_font=dict(color="white"), tickfont=dict(color="white")),
        yaxis=dict(title_font=dict(color="white"), tickfont=dict(color="white")),
        legend=dict(font=dict(color="white"))
        
    )
    
    return json.dumps(fig, cls=PlotlyJSONEncoder)

