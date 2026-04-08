# Backend Readme

## Flask API Endpoints

These two lists can be found in the `main.py` file as well, where all of these endpoints are located.

### API endpoints

- `/day/<day>` - returns a list of flights (as dicts) that occured
- `/day/<day>/dep-times` - returns a list of unique departure times for the given day
- `/day/<day>/<airport>/dep-times` - returns a list of unique departure times for the given day and airport
- `/airport/<airport>` - returns a list of flights originated from the given airport
- `/cancelled` - returns a list of cancelled flights
- `/search/<search_string>` - returns a list of flights with the search string in their ORIGIN_CITY_NAME, DEST_CITY_NAME, ORIGIN, DEST, or MKT_CARRIER

### Endpoints for Charts

- `/charts/late-vs-ontime-carrier` - returns a bar graph comparing late vs ontime flights by carrier
- `/charts/late-vs-ontime-day` - returns a bar graph comparing late vs ontime flights by day
- `/charts/busiest-airports` - returns a bar graph of the airports with most flights in the dataset
- `/charts/flights-by-hour` - returns a line graph of the number of flights departing at each hour of the day

## Setup Instructions

1. Navigate to the correct directory:

```console
 cd backend
```

2. Create a venv

```console
python3 -m venv venv
```

3. Activate the venv

```console
source venv/bin/activate
```

4. Install packages

```
pip install -r requirements.txt
```

5. Run main.py

```console
python main.py
```
