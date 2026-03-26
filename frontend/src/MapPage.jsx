import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { createPoints } from "./scripts/BezierCurve";
import { coords } from "./scripts/airportCoords";
import { PageHeader } from "./components/PageHeader";
import { ChartsPage } from "./ChartsPage";

function flightsToRoutes(flights) {
  return flights
    .filter((flight) => coords[flight.ORIGIN] && coords[flight.DEST])
    .map((flight) => ({
      time: Number(flight.DEP_TIME),
      x1: Number(coords[flight.ORIGIN].lng),
      y1: Number(coords[flight.ORIGIN].lat),
      x2: Number(coords[flight.DEST].lng),
      y2: Number(coords[flight.DEST].lat),
      origin: flight.ORIGIN,
      dest: flight.DEST,
    }));
}

function applyRoutes(routes) {
  if (!window.simplemaps_usmap_mapdata) return;
  createPoints(routes);
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

  useEffect(() => {
    if (selectedDepTime === undefined) {
      setRoutes([]);
      applyRoutes([]);
      return;
    }
    fetch(`${API}/day/1?dep_time=${selectedDepTime}`)
      .then((response) => response.json())
      .then((flights) => {
        const drawnRoutes = flightsToRoutes(flights);
        setRoutes(drawnRoutes);
        applyRoutes(drawnRoutes);
      })
      .catch((error) => console.log(error));
  }, [selectedDepTime]);

  const maxTimeIndex = Math.max(0, depTimes.length - 1);
  const [daySetterShow, setDaySetterShow] = useState(false);
  const [selectedDay, setSelectedDay] = useState(1);
  return (
    <div className=" relative h-screen w-screen max-h-screen max-w-full overflow-hidden flex flex-col bg-linear-to-br from-gray-900 to-[#13162c]">
      <PageHeader />

      <div className="overflow-auto flex-1 min-h-0">
        <div id="map" className="mx-auto w-7/10 h-96 bg-[#13162c]"></div>
      </div>
      <button
        className=" w-20 justify-start border-t border-l border-r rounded-tl border-white/20 bg-black/30 py-1 text-white text-sm"
        onClick={() => setDaySetterShow((prev) => !prev)}
      >
        {daySetterShow ? "▼" : "▲"}
      </button>
      {daySetterShow && (
        <div className=" flex justify-start text-white text-xl">
          {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day, i) => (
            <button
              onClick={() => {
                setSelectedDay(i);
              }}
              className=" w-20 justify-start border-r border-l border-t  hover:bg-white/10 border-white/20 bg-black/30  py-1 text-white text-sm"
            >
              {day}
            </button>
          ))}
        </div>
      )}
      {depTimes.length > 0 && (
        <div className="shrink-0 border-t border-white/20 bg-black/30 px-3 py-2 flex flex-col gap-2 text-white text-xs">
          <label className="flex items-center gap-2">
            <span className="shrink-0 tabular-nums">
              DEP {Math.floor(selectedDepTime / 100) < 10 ? 0 : ""}
              {Math.floor(selectedDepTime / 100)}:
              {selectedDepTime < 10 ? 0 : ""}
              {selectedDepTime % 100}
            </span>
            <input
              type="range"
              min={0}
              max={maxTimeIndex}
              value={Math.min(selectedTimeIndex, maxTimeIndex)}
              onChange={(event) =>
                setSelectedTimeIndex(Number(event.target.value))
              }
              className="w-full"
            />
          </label>
          <div className="max-h-24 overflow-y-auto rounded border border-white/20 bg-white/5 px-2 py-1">
            {routes.map((route, index) => (
              <div key={`${route.origin}-${route.dest}-${route.time}-${index}`}>
                {route.time} {route.origin} → {route.dest}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
