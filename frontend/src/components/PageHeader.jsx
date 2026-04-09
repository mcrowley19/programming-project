import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export function PageHeader(props) {
  const selectedDay = props.selectedDay ?? 1;
  const search = props.search ?? "";
  const onSearch = props.onSearch;
  const selectedDepTime = props.selectedDepTime;

  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const API = "http://127.0.0.1:5000";

  useEffect(() => {
    const q = search.trim();
    if (!q) {
      setResults([]);
      return;
    }
    const d = Math.max(1, Math.trunc(Number(selectedDay)) || 1);
    let url = `${API}/search/${d}/${encodeURIComponent(q)}`;
    if (selectedDepTime !== undefined) url += `?dep_time=${selectedDepTime}`;
    fetch(url)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => setResults(Array.isArray(data) ? data : []))
      .catch(() => setResults([]));
  }, [search, selectedDay, selectedDepTime]);

  function submit(e) {
    e.preventDefault();
    const v = inputRef.current?.value.trim() ?? "";
    if (onSearch) onSearch(v);
  }

  function clear() {
    if (onSearch) onSearch("");
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <>
      <div className="fixed top-3 right-4 z-50 flex items-center gap-4">
        <div className="relative flex flex-col items-end">
          <form
            onSubmit={submit}
            className="flex items-center justify-end gap-1"
          >
            <input
              ref={inputRef}
              className="min-w-[200px] rounded-3xl border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/50 backdrop-blur-[10px] focus:outline-none focus:ring-1 focus:ring-white/30"
              placeholder="Search..."
              name="search"
              defaultValue={search}
            />
            {search.trim() !== "" && (
              <button
                type="button"
                onClick={clear}
                className="rounded-full border border-white/20 bg-white/10 px-2 py-1 text-xs text-white backdrop-blur-[10px] transition-colors hover:bg-white/15"
              >
                Clear
              </button>
            )}
          </form>
          {results.length > 0 && (
            <div
              className="absolute right-0 top-full z-50 mt-1.5 w-[min(calc(100vw-2rem),280px)] overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-lg backdrop-blur-[10px]"
            >
              <ul className="max-h-64 overflow-y-auto py-1">
                {results.map((item, index) => (
                  <li
                    className="border-b border-white/10 px-3 py-2 text-sm text-white/95 last:border-b-0"
                    key={index}
                  >
                    {item.ORIGIN_CITY_NAME} → {item.DEST_CITY_NAME}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <nav className="flex shrink-0 items-center gap-2">
          <Link
            to="/"
            className="text-sm font-bold uppercase tracking-[0.2em] text-white whitespace-nowrap"
          >
            Map
          </Link>
          <span className="text-sm uppercase tracking-[0.2em] text-white">
            |
          </span>
          <Link
            to="/charts"
            className="text-sm font-bold uppercase tracking-[0.2em] text-white whitespace-nowrap"
          >
            Charts
          </Link>
        </nav>
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
