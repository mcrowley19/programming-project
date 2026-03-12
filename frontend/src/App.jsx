import { useEffect } from "react";

function App() {
  useEffect(() => {
    window.simplemaps_usmap.load();
  }, []);
  return (
    <>
      <div className="h-screen w-screen max-h-screen max-w-full overflow-hidden flex flex-col bg-gradient-to-br from-gray-900 to-[#13162c]">
        <header
          className="flex-shrink-0 flex min-w-max items-center gap-2 m-2 px-3 py-1
            rounded-2xl
            bg-white/10
            backdrop-blur-[10px]
            border border-white/20 w-full max-w-[400px] mx-auto"
        >
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="min-w-max flex items-center gap-3 px-4 py-2 rounded-full
                text-white font-semibold
                transition-all hover:opacity-90"
            >
              <h1 className="text-sm font-bold uppercase tracking-[0.2em] whitespace-nowrap">
                Flight History
              </h1>
            </button>
          </div>

          <nav className="flex flex-1 items-center justify-center gap-1"></nav>
        </header>
        <div className="flex-1 min-h-0 overflow-hidden flex items-center justify-center">
          <div id="map" className="scale-[2.2] origin-center"></div>
        </div>
      </div>
    </>
  );
}

export default App;
