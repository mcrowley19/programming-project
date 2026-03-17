import pandas as pd
import json

""""
Format needed for frontend
    "0": {
      name: "New York",
      lat: "40.71",
      lng: "-74.0059731"
    },
    "1": {
      name: "Chicago, IL",
      lat: "41.9288",
      lng: "-87.6315",
    },
    "3": {
      lat: 61.218,
      lng: -149.858,
      name: "Anchorage"
    }
"""
df = pd.read_csv('programming-project/backend/data/airportsCleaned.csv')

airports_dict = {}

iata_list = df["IATA"].tolist()
long_list = df["LATITUDE"].tolist()
lat_list = df["LONGITUDE"].tolist()

for iata, long, lat in zip(iata_list, long_list, lat_list):
    current_airport = {
        "lat": round(lat, 2),
        "lng": round(long, 2),
        "name": iata
        }
    airports_dict[iata] = current_airport

# This outputs a json string which has quotes around the key names. To solve this I did JSON.parse in the js code
print(json.dumps(airports_dict))





