import pandas as pd

""""
This code cleans the dataset when run
"""
DATA_FILE = './data/flightData.csv'

def clean_flights():
    df = pd.read_csv(DATA_FILE)
    df['LATE'] = df['CRS_ARR_TIME'] < df['ARR_TIME']
    df["ON_TIME"] = (df['CRS_ARR_TIME'] >= df['ARR_TIME']) & (df['CANCELLED'] == 0)
    df["FL_DATE"] = df["FL_DATE"].str.slice(0, -12)
    df.to_csv("backend/data/flightDataCleaned.csv", index=False)

if __name__ == "__main__":
    clean_flights()
