import Plot from "react-plotly.js";
import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { createPoints } from "./BezierCurve";
import { coords } from "./airportCoords";
function PageHeader() {
  return (
    <header
      className="flex-shrink-0 flex min-w-max items-center gap-2 m-2 px-3 py-1
        rounded-2xl bg-white/10 backdrop-blur-[10px] border border-white/20 w-full"
    >
      <div className="flex gap-3 items-center">
        <touchable
          type="touchable"
          className="flex gap-3 items-center px-4 py-2 min-w-max font-semibold text-white rounded-full transition-all hover:opacity-90"
        >
          <h1 className="text-sm font-bold uppercase tracking-[0.2em] whitespace-nowrap">
            Flight History
          </h1>
        </touchable>
      </div>

      <nav className="flex flex-1 gap-1 justify-center items-center"></nav>
    </header>
  );
}

function flightsToRoutes(flights) {
  return flights
    .filter(
      (flight) => coords[flight.ORIGIN] && coords[flight.DEST],
    )
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

function MapPage() {
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

  return (
    <div className="h-screen w-screen max-h-screen max-w-full overflow-hidden flex flex-col bg-gradient-to-br from-gray-900 to-[#13162c]">
      <PageHeader />

      <div className="overflow-auto flex-1 min-h-0">
        <div id="map" className="mx-auto w-full h-full bg-gray-800"></div>
      </div>

      {depTimes.length > 0 && (
        <div
          className="shrink-0 border-t border-white/20 bg-black/30 px-3 py-2 flex flex-col gap-2 text-white text-xs"
        >
          <label className="flex items-center gap-2">
            <span className="shrink-0 tabular-nums">DEP {selectedDepTime}</span>
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
              <div
                key={`${route.origin}-${route.dest}-${route.time}-${index}`}
              >
                {route.time} {route.origin} → {route.dest}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ChartsPage() {
  const [graphs, setGraphs] = useState(null);
  useEffect(() => {
    fetch(`${API}/charts/late-vs-ontime-day`)
      .then((response) => response.json())
      .then(setGraphs)
      .catch((error) => console.log(error));
  }, []);
  if (!graphs) {
    return <div className="text-white p-10">Loading Charts...</div>;
  }
  return (
    <div className="h-screen w-screen max-h-screen max-w-full overflow-hidden flex flex-col bg-gradient-to-br from-gray-900 to-[#13162c]">
      <PageHeader />

      <Plot data={graphs.data} layout={graphs.layout} />
    </div>
  );
}

export default function App() {
  return (
    <>
      <div className="flex fixed top-3 right-3 z-50 gap-2">
        <Link to="/" className="px-3 py-1 text-white rounded bg-white/20">
          Map
        </Link>
        <Link to="/charts" className="px-3 py-1 text-white rounded bg-white/20">
          Charts
        </Link>
      </div>

      <Routes>
        <Route path="/" element={<MapPage />} />
        <Route path="/charts" element={<ChartsPage />} />
      </Routes>
    </>
  );
}
