import { useEffect, useState } from "react";

export function DaySlider({
  depTimes,
  selectedDay,
  setSelectedDay,
  selectedDepTime,
  maxTimeIndex,
  selectedTimeIndex,
  setSelectedTimeIndex,
  routes,
}) {
  const [daySetterShow, setDaySetterShow] = useState(false);
  const [timeProgress, setTimeProgress] = useState(false);
  const [draftTimeIndex, setDraftTimeIndex] = useState(selectedTimeIndex);
  const days = ["SAT", "SUN", "MON", "TUE", "WED", "THURS"];

  useEffect(() => {
    setDraftTimeIndex(Math.min(selectedTimeIndex, maxTimeIndex));
  }, [selectedTimeIndex, maxTimeIndex]);

  function commitSlider() {
    const next = Math.min(draftTimeIndex, maxTimeIndex);
    if (next !== selectedTimeIndex) setSelectedTimeIndex(next);
  }

  useEffect(() => {
    if (!timeProgress) return;
    const id = setInterval(() => {
      setSelectedTimeIndex((prev) =>
        prev >= maxTimeIndex ? prev : prev + 1,
      );
    }, 500);
    return () => clearInterval(id);
  }, [timeProgress, maxTimeIndex, setSelectedTimeIndex]);

  useEffect(() => {
    if (timeProgress && selectedTimeIndex >= maxTimeIndex)
      setTimeProgress(false);
  }, [timeProgress, selectedTimeIndex, maxTimeIndex]);

  function depLabel() {
    if (selectedDepTime == null) return "";
    const h = Math.floor(selectedDepTime / 100);
    const m = selectedDepTime % 100;
    return `${h}:${m < 10 ? "0" : ""}${m}`;
  }

  return (
    <>
      <button
        className=" w-20 justify-start border-t border-l border-r rounded-tl border-white/20 bg-black/30 py-1 text-white text-sm"
        onClick={() => setDaySetterShow((prev) => !prev)}
      >
        {daySetterShow ? "▼" : "▲"}
      </button>
      {daySetterShow && (
        <div className=" flex justify-start text-white text-xl">
          {days.map((day, i) => (
            <button
              key={day}
              type="button"
              onClick={() => {
                setSelectedDay(i + 1);
                setDaySetterShow(false);
              }}
              className=" w-20 justify-start border-r border-l border-t  hover:bg-white/10 border-white/20 bg-black/30  py-1 text-white text-sm"
            >
              {day}
            </button>
          ))}
        </div>
      )}
      {depTimes.length > 0 && (
        <div className="shrink-0 border-t border-white/20 bg-black/30 px-3 py-2 flex flex-col gap-2 text-white text-xs">
          <label className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                setTimeProgress((prev) => !prev)
              }
              className="text-white hover:text-white/20 text-xl"
            >
              {timeProgress ? "⏸︎" : "▶"}
            </button>
            <span className="shrink-0 tabular-nums">
              {days[selectedDay - 1]} {depLabel()}
            </span>
            <input
              type="range"
              min={0}
              max={maxTimeIndex}
              value={Math.min(draftTimeIndex, maxTimeIndex)}
              onChange={(e) => setDraftTimeIndex(Number(e.target.value))}
              onPointerUp={commitSlider}
              className="w-full"
            />
          </label>
          <div className="h-24 overflow-y-auto rounded border border-white/20 bg-white/5 px-2 py-1">
            {routes.map((route, index) => (
              <div key={`${route.origin}-${route.dest}-${route.time}-${index}`}>
                {route.time} {route.origin} → {route.dest}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
