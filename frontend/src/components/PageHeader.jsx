import { Link, Route, Routes } from "react-router-dom";
import { useState } from "react";
export function PageHeader() {
  const [results, setResults] = useState([]);
  const API = "http://127.0.0.1:5000";
  const handleSubmit = (e) => {
    e.preventDefault();

    const value = e.target.search.value;

    fetch(`${API}/search/${day}/${value}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setResults(data);
      });
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
      {results.map((item) => (
        <div className="bg-white rounded-xl shadow p-4 h-32 flex items-center justify-center">
          {item.name}
        </div>
      ))}

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
