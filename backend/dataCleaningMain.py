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
df = pd.read_csv('../data/airportsCleaned.csv')

airports_dict = {}

iata_list = df["IATA"].tolist()
long_list = df["LONGITUDE"].tolist()
lat_list = df["LATITUDE"].tolist()

non_mainland_airports = ["ANC", "FAI", "JNU", "KTN", "SIT", "HNL", "OGG", "KOA", "ITO", "LIH", "SJU", "BQN", "PSE", 
                         "GUM", "STT", "STX", "PPG", "SPN", "ROP", "TIQ","ADK", "ADQ", 
                         "AKN", "BET", "BRW", "CDV", "DLG", "GST", "OME", "OTZ", "PSG", "SCC", "WRG", "YAK"]
for iata, long, lat, count in zip(iata_list, long_list, lat_list, range(len(long_list))):
    if iata not in non_mainland_airports:
      current_airport = {
          "lat":str(round(lat,2)),
          "lng": str(round(long, 2)),
          "name": iata
          }
      airports_dict[count] = current_airport

# This outputs a json string which has quotes around the key names. To solve this I did JSON.parse in the js code
print(json.dumps(airports_dict))




