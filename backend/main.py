import csv
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
        if CANCELLED == 1.00:
            self.CANCELLED = True
        else:
            self.CANCELLED = False
        if DIVERTED == 1.00:
            self.DIVERTED = True
        else:
            self.DIVERTED = False
        self.DISTANCE = DISTANCE
    
    def flightDetails(self):
        return f'Flight Date: {self.FL_DATE}\nMarket Carrier: {self.MKT_CARRIER}\nMarket Carrier Flight Number: {self.MKT_CARRIER_FL_NUM}\nOrigin: {self.ORIGIN}\nOrigin City Name: {self.ORIGIN_CITY_NAME}\nOrigin State Abbreviation: {self.ORIGIN_STATE_ABR}\nOrigin WAC: {self.ORIGIN_WAC}\nDestination: {self.DEST}\nDestination City Name: {self.DEST_CITY_NAME}\nDestination State Abbreviation: {self.DEST_STATE_ABR}\nDestination WAC: {self.DEST_WAC}\nCRS Departure Time: {self.CRS_DEP_TIME}\nDeparture Time: {self.DEP_TIME}\nCRS Arrival Time: {self.CRS_ARR_TIME}\nArrival Time: {self.ARR_TIME}\nCancelled: {self.CANCELLED}\nDiverted: {self.DIVERTED}\nDistance: {self.DISTANCE}'

def load_flights():
    flightList = []
    with open('backend/data/flightData.csv') as csvfile:
        reader = csv.reader(csvfile)
        next(reader)
        flightCounter = 0
        for row in reader:
            flightCounter += 1
            flightDataString = str(row).strip('[]')
            try:
                FL_DATE,MKT_CARRIER,MKT_CARRIER_FL_NUM,ORIGIN,ORIGIN_CITY_NAME, OriginCityExt, ORIGIN_STATE_ABR,ORIGIN_WAC,DEST,DEST_CITY_NAME, DestCityExt, DEST_STATE_ABR,DEST_WAC,CRS_DEP_TIME,DEP_TIME,CRS_ARR_TIME,ARR_TIME,CANCELLED,DIVERTED,DISTANCE = flightDataString.split(',')
                # OriginCityExt and DestCityExt are for the seperated state parts of the names because of the commas inbetween them and the city names.
                tempFlight = Flight(FL_DATE,MKT_CARRIER,MKT_CARRIER_FL_NUM,ORIGIN,ORIGIN_CITY_NAME + ',' + OriginCityExt,ORIGIN_STATE_ABR,ORIGIN_WAC,DEST,DEST_CITY_NAME + ',' + DestCityExt,DEST_STATE_ABR,DEST_WAC,CRS_DEP_TIME,DEP_TIME,CRS_ARR_TIME,ARR_TIME,CANCELLED,DIVERTED,DISTANCE)
                flightList.append(tempFlight)
            except Exception as e:
                print(f"Error with {flightCounter}: {e}")
    
    return flightList


def airport_origin_filter(flightList, airport_code):
    filteredFlights = []
    for flight in flightList:
        if flight.ORIGIN == f" '{airport_code}'":
            filteredFlights.append(flight)
    return filteredFlights


def cancel_filter(flightList, state):
    cancelledFlights = []
    for flight in flightList:
        if flight.CANCELLED == state:
            cancelledFlights.append(flight)
    return cancelledFlights




def main():
    flightList = load_flights()

    for flight in airport_origin_filter(flightList, 'ATL'):
        print(f'{flight.flightDetails()}\n')

    #for flight in cancel_filter(flightList, True):
    #    print(f'{flight.flightDetails()}\n')

if __name__ == '__main__':
    main()