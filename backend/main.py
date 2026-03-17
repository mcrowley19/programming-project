import csv
from pathlib import Path
from flask import Flask
from flask import request
from flask_cors import CORS
app = Flask(__name__)

CORS(app)

flightList = []
DATA_FILE = Path(__file__).resolve().parent / 'data' / 'flightData.csv'
class Flight:
    def __init__(self, FL_DATE, MKT_CARRIER, MKT_CARRIER_FL_NUM, ORIGIN, ORIGIN_CITY_NAME, ORIGIN_STATE_ABR, ORIGIN_WAC, DEST, DEST_CITY_NAME, DEST_STATE_ABR, DEST_WAC, CRS_DEP_TIME, DEP_TIME, CRS_ARR_TIME, ARR_TIME, CANCELLED, DIVERTED, DISTANCE):
        self.FL_DATE = FL_DATE
        self.MKT_CARRIER = MKT_CARRIER
        self.MKT_CARRIER_FL_NUM = MKT_CARRIER_FL_NUM
        self.ORIGIN = ORIGIN
        self.ORIGIN_CITY_NAME = ORIGIN_CITY_NAME
        self.ORIGIN_STATE_ABR = ORIGIN_STATE_ABR
        self.ORIGIN_WAC = ORIGIN_WAC
        self.DEST = DEST
        self.DEST_CITY_NAME = DEST_CITY_NAME
        self.DEST_STATE_ABR = DEST_STATE_ABR
        self.DEST_WAC = DEST_WAC
        self.CRS_DEP_TIME = CRS_DEP_TIME
        self.DEP_TIME = DEP_TIME
        self.CRS_ARR_TIME = CRS_ARR_TIME
        self.ARR_TIME = ARR_TIME
        if CANCELLED == "1.00":
            self.CANCELLED = True
        else:
            self.CANCELLED = False


        if DIVERTED == "0.00":
            self.DIVERTED = True
        else:
            self.DIVERTED = False
        self.DISTANCE = DISTANCE
    
    def flightDetails(self):
        return f'Flight Date: {self.FL_DATE}\nMarket Carrier: {self.MKT_CARRIER}\nMarket Carrier Flight Number: {self.MKT_CARRIER_FL_NUM}\nOrigin: {self.ORIGIN}\nOrigin City Name: {self.ORIGIN_CITY_NAME}\nOrigin State Abbreviation: {self.ORIGIN_STATE_ABR}\nOrigin WAC: {self.ORIGIN_WAC}\nDestination: {self.DEST}\nDestination City Name: {self.DEST_CITY_NAME}\nDestination State Abbreviation: {self.DEST_STATE_ABR}\nDestination WAC: {self.DEST_WAC}\nCRS Departure Time: {self.CRS_DEP_TIME}\nDeparture Time: {self.DEP_TIME}\nCRS Arrival Time: {self.CRS_ARR_TIME}\nArrival Time: {self.ARR_TIME}\nCancelled: {self.CANCELLED}\nDiverted: {self.DIVERTED}\nDistance: {self.DISTANCE}\n'

def load_flights():
    if flightList:
        return

    with open(DATA_FILE) as csvfile:
        reader = csv.reader(csvfile)
        next(reader) # skips the first line of the CSV file
        flightCounter = 0
        for row in reader:
            flightCounter += 1
            flightDataString = str(row).strip('[]').replace("\'", "")
            try:
                FL_DATE,MKT_CARRIER,MKT_CARRIER_FL_NUM,ORIGIN,ORIGIN_CITY_NAME, OriginCityExt, ORIGIN_STATE_ABR,ORIGIN_WAC,DEST,DEST_CITY_NAME, DestCityExt, DEST_STATE_ABR,DEST_WAC,CRS_DEP_TIME,DEP_TIME,CRS_ARR_TIME,ARR_TIME,CANCELLED,DIVERTED,DISTANCE = flightDataString.split(',')
                # OriginCityExt and DestCityExt are for the seperated state parts of the names because of the commas inbetween them and the city names.
                tempFlight = Flight(FL_DATE,MKT_CARRIER,MKT_CARRIER_FL_NUM,ORIGIN,ORIGIN_CITY_NAME + ',' + OriginCityExt,ORIGIN_STATE_ABR,ORIGIN_WAC,DEST,DEST_CITY_NAME + ',' + DestCityExt,DEST_STATE_ABR,DEST_WAC,CRS_DEP_TIME,DEP_TIME,CRS_ARR_TIME,ARR_TIME,CANCELLED.strip(),DIVERTED.strip(),DISTANCE)
                flightList.append(tempFlight)
            except Exception as e:
                print(f"Error with {flightCounter}: {e}")


def airport_origin_filter(airport_code):
    filteredFlights = []
    for flight in flightList:
        if flight.ORIGIN == f" '{airport_code}'":
            filteredFlights.append(flight)
    return filteredFlights


def cancel_filter(state):
    cancelledFlights = []
    for flight in flightList:
        if flight.CANCELLED == state:
            cancelledFlights.append(flight)
            print(f'{flight.flightDetails()}')
    return cancelledFlights


def main():
    load_flights()


    cancelledList = cancel_filter(True)
    
    for flight in cancelledList:
        print(f'{flight.flightDetails()}')

    print(len(cancelledList))


@app.route('/testAccess')
def testAccess():
    load_flights()
    if not flightList:
        return 'No flights loaded.', 500
    return flightList[0].flightDetails()


@app.route('/')
def home():
    return 'Flask API is running. Try /testAccess'

if __name__ == '__main__':
    main()