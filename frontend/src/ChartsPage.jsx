import Plot from "react-plotly.js";
import { useEffect, useState } from "react";
import { PageHeader } from "./components/PageHeader";

export function ChartsPage() {
  const [search, setSearch] = useState("");
  const [LVOTDay, setLVOTDay] = useState(null);
  const [LVOTCarrier, setLVOTCarrier] = useState(null);
  const [BA, setBA] = useState(null);
  const [FBH, setFBH] = useState(null);
  const [chartNum, setChartNum] = useState(0);

  const API = "http://127.0.0.1:5000";
  useEffect(() => {
    // All charts at loaded when the page is loaded - Michael
    // Chart 1
    fetch(`${API}/charts/late-vs-ontime-day`)
      .then((response) => response.json())
      .then(setLVOTDay)
      .catch((error) => console.log(error));

    // Chart 2
    fetch(`${API}/charts/late-vs-ontime-carrier`)
      .then((response) => response.json())
      .then(setLVOTCarrier)
      .catch((error) => console.log(error));

    // Chart 3
    fetch(`${API}/charts/busiest-airports`)
      .then((response) => response.json())
      .then(setBA)
      .catch((error) => console.log(error));

    // Chart 4
    fetch(`${API}/charts/flights-by-hour`)
      .then((response) => response.json())
      .then(setFBH)
      .catch((error) => console.log(error));
  }, []);
  const charts = [LVOTDay, LVOTCarrier, BA, FBH];
  const chartData = charts[chartNum];
  function nextChart() {
    setChartNum((prev) => (prev + 1) % charts.length);
  }
  function prevChart() {
    setChartNum((prev) => (prev == 0 ? charts.length - 1 : prev - 1));
  }
  if (!chartData || !chartData.data) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-[#13162c]/85">
        <div className="h-10 w-10 rounded-full border-2 border-white/25 border-t-white animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-screen  align-middle w-full max-h-screen items-center max-w-full overflow-hidden flex flex-col bg-linear-to-br from-gray-900 to-[#13162c]">
      <PageHeader selectedDay={1} search={search} onSearch={setSearch} />
      <div className="flex flex-1 justify-center items-center">
        <button
          className="cursor-pointer text-3xl text-white font-bold uppercase m-10"
          onClick={prevChart}
        >
          {"<"}
        </button>
        <Plot data={chartData.data} layout={chartData.layout} />
        <button
          className="cursor-pointer text-3xl text-white font-bold uppercase m-10"
          onClick={nextChart}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
