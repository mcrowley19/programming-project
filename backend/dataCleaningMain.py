import pandas as pd


#literally just removes the last 12 characters i.e. the "12:00:00AM" from the date line

flightData = pd.read_csv("backend/data/flightData.csv")

flightData["FL_DATE"] = flightData["FL_DATE"].str.slice(0, -12)


flightData.to_csv("backend/data/flightDataCleaned.csv", index=False)

        

