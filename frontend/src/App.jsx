import { useEffect, useState } from "react";

function App() {
  useEffect(() => {
    const mapEl = document.getElementById("map");
    if (!mapEl) return;

    const mapAlreadyRendered = mapEl.querySelector("#map_holder");
    if (!mapAlreadyRendered && window.simplemaps_usmap?.load) {
      window.simplemaps_usmap.load();
    }

    const syncMapSize = () => {
      window.simplemaps_usmap?.resize?.();
    };

    const rafId = window.requestAnimationFrame(syncMapSize);
    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(syncMapSize)
        : null;
    observer?.observe(mapEl);

    return () => {
      window.cancelAnimationFrame(rafId);
      observer?.disconnect();
    };
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/day/1")
      .then((res) => res.text())
      .then((text) => setMessage(text))
      .catch(() => setMessage("Backend not connected"));
  }, []);

  const [message, setMessage] = useState("Loading backend...");

  return (
    <>
      <div className="h-screen w-screen max-h-screen max-w-full overflow-hidden flex flex-col bg-gradient-to-br from-gray-900 to-[#13162c]">
        <header
          className="flex-shrink-0 flex min-w-max items-center gap-2 m-2 px-3 py-1
            rounded-2xl
            bg-white/10
            backdrop-blur-[10px]
            border border-white/20 w-full"
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
        <div className="mx-2 mb-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs text-white/90 whitespace-pre-line">
          {message}
        </div>
        <div className="flex-1 min-h-0 overflow-auto">
          <div id="map" className="mx-auto w-full min-w-0"></div>
        </div>
      </div>
    </>
  );
}

export default App;
