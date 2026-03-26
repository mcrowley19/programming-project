import { Route, Routes } from "react-router-dom";
import { ChartsPage } from "./ChartsPage";
import { MapPage } from "./MapPage";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MapPage />} />
        <Route path="/charts" element={<ChartsPage />} />
      </Routes>
    </>
  );
}
