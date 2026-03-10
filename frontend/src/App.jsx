import { useEffect } from "react";

function App() {
  useEffect(() => {
    window.simplemaps_usmap.load();
  }, []);
  return (
    <>
      <div className="pointer-events-auto mx-auto w-full max-w-[1600px] overflow-x-auto ">
        <header className="flex min-w-max items-center gap-4 rounded-2xl border  px-6 py-3  backdrop-blur-xl m-2">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex items-center gap-3 transition-colors hover:opacity-80"
            >
              <h1 className="text-sm font-bold uppercase tracking-[0.2em] whitespace-nowrap">
                Flight History
              </h1>
            </button>
          </div>
          <nav className="flex flex-1 items-center justify-center gap-1"></nav>
        </header>
        <div id="map"></div>
      </div>
    </>
  );
}

export default App;
