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
        color_discrete_sequence=["rgba(231, 232, 234, 1)", "rgba(237, 43, 43, 0.75)"],
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
        color_discrete_sequence=["rgba(231, 232, 234, 1)", "rgba(237, 43, 43, 0.75)"],
        width = 1200,
        height = 700
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
        labels={"DEP_HOUR": "Departure Hour", "FLIGHTS": "Number of Flights"}
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
    fig.update_traces(mode="markers+lines", hovertemplate=None)
    fig.update_layout(hovermode="x") 
    
    return json.dumps(fig, cls=PlotlyJSONEncoder)


def build_top_busiest_airports_fig():
    df=pd.read_csv(DATA_FILE)
    top50=df['ORIGIN'].value_counts().nlargest(50).reset_index()
    
    fig = px.bar(
        top50,
        x='ORIGIN', 
        y='count',
        title="Top 50 Busiest Airports by Departures" ,
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
    fig.update_xaxes(tickangle=45)
    
    return json.dumps(fig, cls=PlotlyJSONEncoder)

