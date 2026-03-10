import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div class="pointer-events-auto mx-auto w-full max-w-[1600px] overflow-x-auto ">
        <header class="flex min-w-max items-center gap-4 rounded-2xl border  px-6 py-3  backdrop-blur-xl m-2">
          <div class="flex items-center gap-3">
            <button
              type="button"
              class="flex items-center gap-3 transition-colors hover:opacity-80"
            >
              <h1 class="text-sm font-bold uppercase tracking-[0.2em] whitespace-nowrap">
                Flight History
              </h1>
            </button>
          </div>
          <nav class="flex flex-1 items-center justify-center gap-1"></nav>
        </header>
      </div>
    </>
  );
}

export default App;
