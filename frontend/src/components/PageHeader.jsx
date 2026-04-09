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
      <form
        onSubmit={submit}
        className="fixed top-5 right-50 z-50 flex items-center gap-1 z-51"
      >
        <input
          ref={inputRef}
          className="flex gap-2 pl-3 bg-white rounded-3xl text-sm focus:outline-none"
          placeholder="Search..."
          name="search"
          defaultValue={search}
        />
        {search.trim() !== "" && (
          <button
            type="button"
            onClick={clear}
            className="rounded-full bg-white/90 px-2 py-1 text-xs text-gray-700 hover:bg-white"
          >
            Clear
          </button>
        )}
      </form>
      <div className="absolute top-8 right-62.5 pl-1 z-40 rounded-xs w-[207px]">
        {results.map((item, index) => (
          <div className="bg-white pb-2 pt-5 pl-2 text-xs flex" key={index}>
            {item.ORIGIN_CITY_NAME} → {item.DEST_CITY_NAME}
          </div>
        ))}
      </div>

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
