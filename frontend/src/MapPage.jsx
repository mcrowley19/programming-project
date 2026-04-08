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
  let acc = [];
  for (const flight of flights) {
    if (coords[flight.ORIGIN] && coords[flight.DEST]) {
      acc.push({
        lng: Number(coords[flight.ORIGIN].lng),
        lat: Number(coords[flight.ORIGIN].lat),
        name: flight.ORIGIN,
      });
      acc.push({
        lng: Number(coords[flight.DEST].lng),
        lat: Number(coords[flight.DEST].lat),
        name: flight.DEST,
      });
    }
  }
  return acc;
}

function applyRoutes(routes, airports, airportData) {
  if (!window.simplemaps_usmap_mapdata) return;
  createPoints(routes, airports, airportData);
  window.simplemaps_usmap?.load?.();
  window.requestAnimationFrame(() => window.simplemaps_usmap?.resize?.());
}

const API = "http://127.0.0.1:5000";

export function MapPage() {
  const [depTimes, setDepTimes] = useState([]);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState(0);
  const [routes, setRoutes] = useState([]);
  const [selectedDay, setSelectedDay] = useState(1);
  const [search, setSearch] = useState("");
  const [mapLoading, setMapLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/day/${selectedDay}/dep-times`)
      .then((r) => r.json())
      .then((times) => {
        setDepTimes(Array.isArray(times) ? times : []);
        setSelectedTimeIndex(0);
      })
      .catch(console.log);
  }, [selectedDay]);

  const selectedDepTime = depTimes[selectedTimeIndex];

  async function drawMap(flights) {
    const codes = [];
    const names = [];
    for (const f of flights) {
      if (!codes.includes(f.ORIGIN)) {
        codes.push(f.ORIGIN);
        names.push(f.ORIGIN_CITY_NAME);
      }
      if (!codes.includes(f.DEST)) {
        codes.push(f.DEST);
        names.push(f.DEST_CITY_NAME);
      }
    }
    const airportData = {};
    for (let i = 0; i < codes.length; i++) {
      const data = await (await fetch(`${API}/airport/${codes[i]}`)).json();
      airportData[codes[i]] = { count: data.length, name: names[i] };
    }
    const drawn = flightsToRoutes(flights);
    const airports = flightsToAirports(flights);
    setRoutes(drawn);
    applyRoutes(drawn, airports, airportData);
  }

  useEffect(() => {
    let dead = false;
    (async () => {
      setMapLoading(true);
      const q = search.trim();
      try {
        if (selectedDepTime === undefined) {
          setRoutes([]);
          applyRoutes([], [], {});
          return;
        }
        const t = `?dep_time=${selectedDepTime}`;
        let flights;
        if (q) {
          const res = await fetch(
            `${API}/search/${selectedDay}/${encodeURIComponent(q)}${t}`,
          );
          if (!res.ok) return;
          flights = await res.json();
        } else {
          flights = await (
            await fetch(`${API}/day/${selectedDay}${t}`)
          ).json();
        }
        if (!dead) await drawMap(flights);
      } catch (e) {
        console.log(e);
      } finally {
        if (!dead) setMapLoading(false);
      }
    })();
    return () => {
      dead = true;
    };
  }, [search, selectedDay, selectedDepTime]);

  const maxTimeIndex = Math.max(0, depTimes.length - 1);

  return (
    <div className=" relative h-screen w-full max-h-screen max-w-full overflow-hidden flex flex-col bg-linear-to-br from-gray-900 to-[#13162c]">
      <PageHeader
        selectedDay={selectedDay}
        search={search}
        onSearch={setSearch}
        selectedDepTime={selectedDepTime}
      />

      <div className="overflow-auto pt-13 flex-1 min-h-0">
        <div className="relative mx-auto w-6/10 h-96">
          <div id="map" className="h-full w-full bg-[#13162c]"></div>
          {mapLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#13162c]/85">
              <div className="h-10 w-10 rounded-full border-2 border-white/25 border-t-white animate-spin" />
            </div>
          )}
        </div>
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
