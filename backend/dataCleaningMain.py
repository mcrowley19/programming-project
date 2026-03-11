import pandas as pd
from pathlib import Path

#literally just removes the last 12 characters i.e. the "12:00:00AM" from the date line

backendLocation = Path(__file__).parent
loadLocation = backendLocation / "data" / "flightData.csv"
saveLocation = backendLocation / "data" / "flightDataCleaned.csv"
flightData = pd.read_csv(loadLocation)

flightData["FL_DATE"] = flightData["FL_DATE"].str.slice(0, -12)


flightData.to_csv(saveLocation, index=False)

        

