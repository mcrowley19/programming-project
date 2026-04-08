import { Link } from "react-router-dom";
import { useState } from "react";

function formatDepTime(value) {
  if (value == null || Number.isNaN(Number(value))) return "—";
  const t = Math.trunc(Number(value));
  const h = Math.floor(t / 100);
  const m = t % 100;
  return `${h}:${String(m).padStart(2, "0")}`;
}

export function PageHeader({ selectedDay = 1 }) {
  const [results, setResults] = useState([]);
  const API = "http://127.0.0.1:5000";
  const handleSubmit = (e) => {
    e.preventDefault();

    const value = e.target.search.value.trim();
    if (!value) return;

    fetch(`${API}/search/${selectedDay}/${encodeURIComponent(value)}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(Array.isArray(data) ? data : []);
      })
      .catch(() => setResults([]));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          className="flex fixed top-5 right-50 z-50 gap-2 pl-3 bg-white rounded-3xl text-sm  focus:outline-none "
          placeholder={"Search..."}
          name="search"
        />
      </form>
      {results.length > 0 && (
        <div
          className="fixed top-14 right-4 z-50 flex w-[min(22rem,calc(100vw-2rem))] max-h-[min(24rem,50vh)] flex-col overflow-hidden rounded-xl border border-white/20 bg-[#1a1d2e] shadow-xl"
          role="dialog"
          aria-label="Search results"
        >
          <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-3 py-2">
            <span className="text-xs font-medium uppercase tracking-wide text-white/80">
              {results.length} flight{results.length === 1 ? "" : "s"}
            </span>
            <button
              type="button"
              onClick={() => setResults([])}
              className="rounded-lg px-2 py-1 text-xs text-white/70 hover:bg-white/10 hover:text-white"
            >
              Close
            </button>
          </div>
          <ul className="min-h-0 flex-1 overflow-y-auto divide-y divide-white/10">
            {results.map((f, i) => (
              <li
                key={`${f.ORIGIN}-${f.DEST}-${f.DEP_TIME}-${f.MKT_CARRIER_FL_NUM ?? ""}-${i}`}
                className="px-3 py-2 text-sm"
              >
                <div className="font-medium text-white">
                  {f.MKT_CARRIER ?? "—"}{" "}
                  <span className="text-white/80">
                    {formatDepTime(f.DEP_TIME ?? f.CRS_DEP_TIME)}
                  </span>
                </div>
                <div className="text-white/75">
                  {f.ORIGIN} → {f.DEST}
                </div>
                <div className="truncate text-xs text-white/50">
                  {f.ORIGIN_CITY_NAME} → {f.DEST_CITY_NAME}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex fixed top-3 right-3 z-50 gap-2 pt-2">
        <Link
          to="/"
          className="text-sm text-white font-bold uppercase tracking-[0.2em] whitespace-nowrap "
        >
          Map
        </Link>
        <p className="text-white text-sm  uppercase tracking-[0.2em] ">|</p>
        <Link
          to="/charts"
          className="text-sm text-white font-bold uppercase tracking-[0.2em] whitespace-nowrap "
        >
          Charts
        </Link>
      </div>
      <header
        className="shrink-0 flex items-center gap-2 m-2 px-3 py-1
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
    </>
  );
}
