import plotly.express as px
import pandas as pd
pd.options.plotting.backend = "plotly"

df = pd.read_csv("backend/data/flightDataCleaned.csv")

lateFlights = df.groupby("MKT_CARRIER")[["LATE", "ON_TIME"]].sum().reset_index()
carriers = [df["MKT_CARRIER"].unique()]

counts_list = [df['FL_DATE'].value_counts().get('1/1/2022', 0),
               df['FL_DATE'].value_counts().get('1/2/2022', 0),
               df['FL_DATE'].value_counts().get('1/3/2022', 0),
               df['FL_DATE'].value_counts().get('1/4/2022', 0),
               df['FL_DATE'].value_counts().get('1/5/2022', 0),
               df['FL_DATE'].value_counts().get('1/6/2022', 0),
               ]
data_canada = px.data.gapminder().query("country == 'Canada'")
fig = px.bar(data_canada, x=df["FL_DATE"].unique().tolist(), y=counts_list,
             labels=dict(x="Date", y="Flights count"))





fig2 =lateFlights.plot(kind="bar", x="MKT_CARRIER", y=["ON_TIME", "LATE"],
                       labels = dict(x="Amount of flights", y = "Carrier"))
fig2.show()

print(lateFlights)

fig.show()




