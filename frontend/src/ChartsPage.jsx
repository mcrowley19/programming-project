import Plot from "react-plotly.js";
import { useEffect, useState } from "react";
import { PageHeader } from "./components/PageHeader";
import { Button } from "react";
export function ChartsPage() {
  const [lvotday, setLvotday] = useState(null);
  const [lvotcarrier, setLvotcarrier] = useState(null);

  const [chartNum, setChartNum] = useState(0);

  const API = "http://127.0.0.1:5000";
  useEffect(() => {
    fetch(`${API}/charts/late-vs-ontime-day`)
      .then((response) => response.json())
      .then(setLvotday)
      .catch((error) => console.log(error));
    fetch(`${API}/charts/late-vs-ontime-carrier`)
      .then((response) => response.json())
      .then(setLvotcarrier)
      .catch((error) => console.log(error));
  }, []);
  const charts = [lvotday, lvotcarrier];
  const chartData = charts[chartNum];
  function nextChart() {
    setChartNum((prev) => (prev + 1) % charts.length);
  }
  function prevChart() {
    setChartNum((prev) => (prev == 0 ? charts.length - 1 : prev - 1));
  }
  if (!chartData || !chartData.data) {
    return <div className="text-white p-10">Loading Charts...</div>;
  }

  return (
    <div className="h-screen  align-middle w-screen max-h-screen items-center max-w-full overflow-hidden flex flex-col bg-gradient-to-br from-gray-900 to-[#13162c]">
      <PageHeader />
      <div className="flex flex-1 justify-center items-center">
        <button
          className="text-3xl text-white font-bold uppercase m-10"
          onClick={prevChart}
        >
          {"<"}
        </button>
        <Plot data={chartData.data} layout={chartData.layout} />
        <button
          className="text-3xl text-white font-bold uppercase m-10"
          onClick={nextChart}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
