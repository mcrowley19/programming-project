import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { createPoints } from "./BezierCurve";

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
  const [message, setMessage] = useState("Loading backend...");

  useEffect(() => {
    const mapEl = document.getElementById("map");

    // initalise map with epic curved paths!!!
    const initMap = () => {

      //temporary hardcoded routes for fligths.
      const routes = [
        { x1: -106.61, y1: 35.04, x2: -84.43, y2: 33.64 },
        { x1: -118.24, y1: 33.94, x2: -73.78, y2: 40.64 },
        { x1: -87.90, y1: 41.98, x2: -97.04, y2: 32.90 },
        { x1: -122.37, y1: 37.62, x2: -80.29, y2: 25.80 },
        { x1: -122.30, y1: 47.45, x2: -87.90, y2: 41.98 },
        { x1: -104.67, y1: 39.86, x2: -115.15, y2: 36.08 },
        { x1: -112.01, y1: 33.43, x2: -71.01, y2: 42.36 },
        { x1: -118.24, y1: 33.94, x2: -104.67, y2: 39.86 },
        { x1: -94.72, y1: 39.30, x2: -95.27, y2: 29.98 },
        { x1: -93.22, y1: 44.88, x2: -84.43, y2: 33.64 },
        { x1: -122.37, y1: 37.62, x2: -115.15, y2: 36.08 },
        { x1: -80.29, y1: 25.80, x2: -73.78, y2: 40.64 },
        { x1: -97.04, y1: 32.90, x2: -71.01, y2: 42.36 },
        { x1: -122.30, y1: 47.45, x2: -118.24, y2: 33.94 },
        { x1: -95.27, y1: 29.98, x2: -104.67, y2: 39.86 },
      ];
      createPoints(routes);

      window.simplemaps_usmap.load();
    };
    // run itialisation of epic curved paths
    initMap();

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

  useEffect(() => {
    fetch("http://127.0.0.1:5000/day/1")
      .then((res) => res.text())
      .then((text) => setMessage(text))
      .catch(() => setMessage("Backend not connected"));
  }, []);

  return (
    <div className="h-screen w-screen max-h-screen max-w-full overflow-hidden flex flex-col bg-gradient-to-br from-gray-900 to-[#13162c]">
      <PageHeader />

      <div className="px-3 py-2 mx-2 mb-2 text-xs whitespace-pre-line rounded-xl border border-white/15 bg-white/5 text-white/90">
        {message}
      </div>

      <div className="overflow-auto flex-1 min-h-0">
        <div id="map" className="mx-auto w-full h-full bg-gray-800"></div>
      </div>
    </div>
  );
}

function ChartsPage() {
  return (
    <div className="h-screen w-screen max-h-screen max-w-full overflow-hidden flex flex-col bg-gradient-to-br from-gray-900 to-[#13162c]">
      <PageHeader />
      <iframe
        src="http://127.0.0.1:5000/charts/late-vs-ontime"
        title="Late vs On-Time Chart"
        className="w-full flex-1 min-h-0 rounded-lg bg-white"
      />
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
