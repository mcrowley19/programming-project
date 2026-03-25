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

function MapPage() {
  const [routes, setRoutes] = useState([]);
  useEffect(() => {
    const mapEl = document.getElementById("map");
    fetch("http://127.0.0.1:5000/day/1")
      .then((res) => res.json())
      .then((flights) => {
        const newRoutes = [];
        for (let i = 0; i < flights.length; i++) {
          const origin = flights[i].ORIGIN;
          const dest = flights[i].DEST;

          if (
            coords[origin] &&
            coords[dest] &&
            Number(flights[i].DEP_TIME) > 700 &&
            Number(flights[i].DEP_TIME) < 720
          ) {
            const x1 = Number(coords[origin].lng);
            const y1 = Number(coords[origin].lat);
            const x2 = Number(coords[dest].lng);
            const y2 = Number(coords[dest].lat);
            newRoutes.push({
              time: Number(flights[i].DEP_TIME),
              x1: x1,
              x2: x2,
              y1: y1,
              y2: y2,
            });
          }
        }
        setRoutes(newRoutes);
        createPoints(newRoutes);

        window.simplemaps_usmap.load();
      })
      .catch((e) => console.log(e));

    // initalise map with epic curved paths!!!
    const initMap = () => {
      //temporary hardcoded routes for fligths.
      createPoints(routes);

      window.simplemaps_usmap.load();
    };
    // run itialisation of epic curved paths

    const syncMapSize = () => {
      window.simplemaps_usmap?.resize?.();
    };

    const rafId = window.requestAnimationFrame(syncMapSize);
    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(syncMapSize)
        : null;

    observer?.observe(mapEl);

    return () => {
      window.cancelAnimationFrame(rafId);
      observer?.disconnect();
    };
  }, []);

  useEffect(() => {}, []);

  return (
    <div className="h-screen w-screen max-h-screen max-w-full overflow-hidden flex flex-col bg-gradient-to-br from-gray-900 to-[#13162c]">
      <PageHeader />

      <div className="overflow-auto flex-1 min-h-0">
        <div id="map" className="mx-auto w-full h-full bg-gray-800"></div>
      </div>
    </div>
  );
}

function ChartsPage() {
  const [graphs, setGraphs] = useState(null);
  useEffect(() => {
    const mapEl = document.getElementById("map");
    fetch("http://127.0.0.1:5000/charts/late-vs-ontime")
      .then((res) => res.json())
      .then((chart) => {
        setGraphs(chart);
      });
  });
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
