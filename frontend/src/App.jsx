import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex justify-center gap-8 my-6">
        <a
          href="https://vite.dev"
          target="_blank"
          className="hover:scale-105 transition-transform"
        >
          <img src={viteLogo} className="w-24 h-24" alt="Vite logo" />
        </a>
        <a
          href="https://react.dev"
          target="_blank"
          className="hover:scale-105 transition-transform"
        >
          <img src={reactLogo} className="w-24 h-24" alt="React logo" />
        </a>
      </div>

      <h1 className="text-4xl font-bold text-center mb-6">Vite + React</h1>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 max-w-sm mx-auto text-center mb-6">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors"
        >
          count is {count}
        </button>
        <p className="mt-4 text-gray-700 dark:text-gray-300">
          Edit{" "}
          <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
            src/App.jsx
          </code>{" "}
          and save to test HMR
        </p>
      </div>

      <p className="text-center text-gray-600 dark:text-gray-400">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
