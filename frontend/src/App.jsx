import { useEffect } from "react";

function App() {
  useEffect(() => {
    window.simplemaps_usmap.load();
  }, []);
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-[#13162c] flex justify-center items-start p-10">
        <div className="pointer-events-auto mx-auto w-full max-w-[1600px]">
          <header
            className="flex min-w-max items-center gap-4 m-2 px-6 py-3
            rounded-[16px]
            bg-white/10
            shadow-[0_4px_30px_rgba(0,0,0,0.5)]
            backdrop-blur-[10px]
            border border-white/20"
          >
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="flex items-center gap-3 px-4 py-2 rounded-full
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
          <div id="map"></div>
        </div>
      </div>
    </>
  );
}

export default App;
