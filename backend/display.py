import pandas as pd
import plotly.express as px

DATA_FILE = "data/flightDataCleaned.csv" # remarkable algorithm that finds the path


def build_late_vs_ontime_fig():
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

    return fig