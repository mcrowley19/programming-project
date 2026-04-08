import { Link } from "react-router-dom";
import { useState } from "react";
export function PageHeader(selectedDay) {
  const [results, setResults] = useState([]);
  const API = "http://127.0.0.1:5000";
  const handleSubmit = (e) => {
    e.preventDefault();

    const value = e.target.search.value.trim();
    if (!value) return;

    fetch(`${API}/search/${selectedDay}/${value}`)
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
      <div className="absolute top-11 right-30 z-50 w-[250px]">
        {results.map((item, index) => (
          <div
            className="bg-white rounded-s shadow p-4 h-2 flex items-center justify-center "
            key={index}
          >
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
