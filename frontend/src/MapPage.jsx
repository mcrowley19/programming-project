import { useEffect, useState } from "react";
import { createPoints } from "./scripts/BezierCurve";
import { coords } from "./scripts/airportCoords";
import { PageHeader } from "./components/PageHeader";
import { DaySlider } from "./components/DaySlider";
function flightsToRoutes(flights) {
  return flights
    .filter((flight) => coords[flight.ORIGIN] && coords[flight.DEST])
    .map((flight) => ({
      originCity: flight.ORIGIN_CITY_NAME,
      destCity: flight.DEST_CITY_NAME,
      arrTime: Number(flight.ARR_TIME),
      distance: Number(flight.DISTANCE),
      time: Number(flight.DEP_TIME),
      x1: Number(coords[flight.ORIGIN].lng),
      y1: Number(coords[flight.ORIGIN].lat),
      x2: Number(coords[flight.DEST].lng),
      y2: Number(coords[flight.DEST].lat),
      origin: flight.ORIGIN,
      dest: flight.DEST,
    }));
}
function flightsToAirports(flights) {
  return flights
    .filter((flight) => coords[flight.ORIGIN] && coords[flight.DEST])
    .reduce((acc, flight) => {
      (acc.push({
        lng: Number(coords[flight.ORIGIN].lng),
        lat: Number(coords[flight.ORIGIN].lat),
        name: flight.ORIGIN,
      }),
        acc.push({
          lng: Number(coords[flight.DEST].lng),
          lat: Number(coords[flight.DEST].lat),
          name: flight.DEST,
        }));
      return acc;
    }, []);
}

function applyRoutes(routes, airports) {
  if (!window.simplemaps_usmap_mapdata) return;
  createPoints(routes, airports);
  window.simplemaps_usmap?.load?.();
  window.requestAnimationFrame(() => window.simplemaps_usmap?.resize?.());
}

const API = "http://127.0.0.1:5000";

export function MapPage() {
  const [depTimes, setDepTimes] = useState([]);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState(0);
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const mapElement = document.getElementById("map");
    fetch(`${API}/day/1/dep-times`)
      .then((response) => response.json())
      .then((times) => {
        setDepTimes(Array.isArray(times) ? times : []);
        setSelectedTimeIndex(0);
      })
      .catch((error) => console.log(error));

    const resizeMap = () => window.simplemaps_usmap?.resize?.();
    const resizeFrameId = window.requestAnimationFrame(resizeMap);
    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(resizeMap)
        : null;
    resizeObserver?.observe(mapElement);
    return () => {
      window.cancelAnimationFrame(resizeFrameId);
      resizeObserver?.disconnect();
    };
  }, []);

  const selectedDepTime = depTimes[selectedTimeIndex];
  const [selectedDay, setSelectedDay] = useState(1);
  useEffect(() => {
    if (selectedDepTime === undefined) {
      setRoutes([]);
      applyRoutes([], []);
      return;
    }
    fetch(`${API}/day/${selectedDay}?dep_time=${selectedDepTime}`)
      .then((response) => response.json())
      .then((flights) => {
        const drawnRoutes = flightsToRoutes(flights);
        const airports = flightsToAirports(flights);
        setRoutes(drawnRoutes);
        applyRoutes(drawnRoutes, airports);
      })
      .catch((error) => console.log(error));
  }, [selectedDepTime, selectedDay]);

  const maxTimeIndex = Math.max(0, depTimes.length - 1);

  return (
    <div className=" relative h-screen w-screen max-h-screen max-w-full overflow-hidden flex flex-col bg-linear-to-br from-gray-900 to-[#13162c]">
      <PageHeader />

      <div className="overflow-auto pt-13 flex-1 min-h-0">
        <div id="map" className="mx-auto w-6/10 h-96 bg-[#13162c]"></div>
      </div>
      <DaySlider
        depTimes={depTimes}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        selectedDepTime={selectedDepTime}
        maxTimeIndex={maxTimeIndex}
        selectedTimeIndex={selectedTimeIndex}
        setSelectedTimeIndex={setSelectedTimeIndex}
        routes={routes}
      />
    </div>
  );
}
