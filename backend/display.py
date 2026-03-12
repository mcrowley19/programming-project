import plotly.express as px
import pandas as pd

df = pd.read_csv("backend/data/flightDataCleaned.csv")


counts_list = [df['FL_DATE'].value_counts().get('1/1/2022', 0),
               df['FL_DATE'].value_counts().get('1/2/2022', 0),
               df['FL_DATE'].value_counts().get('1/3/2022', 0),
               df['FL_DATE'].value_counts().get('1/4/2022', 0),
               df['FL_DATE'].value_counts().get('1/5/2022', 0),
               df['FL_DATE'].value_counts().get('1/6/2022', 0),
               ]
data_canada = px.data.gapminder().query("country == 'Canada'")
fig = px.bar(data_canada, x=df["FL_DATE"].unique().tolist(), y=counts_list)
fig.show()




