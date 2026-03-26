import { Link, Route, Routes } from "react-router-dom";

export function PageHeader() {
  return (
    <>
      <div className="flex fixed top-3 right-3 z-50 gap-2  pt-2 pr-5">
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
        className="shrink-0 flex min-w-max items-center gap-2 m-2 px-3 py-1
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
