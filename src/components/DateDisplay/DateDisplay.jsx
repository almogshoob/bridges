import { useEffect, useRef, useState } from "react";
import useBoardStore from "../../stores/boardStore";
import useSettingsStore from "../../stores/settingsStore";
import {
  getTodayDate,
  getTomorrowDate,
  getTomorrowLevel,
} from "../../utils/utils";

export const DateDisplay = () => {
  const { date, handleMouseDown, handleMouseNotDown } = useTomorrow();

  return (
    <p
      className="date"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseNotDown}
      onMouseLeave={handleMouseNotDown}
    >
      {date.day}/{date.month}
    </p>
  );
};

const useTomorrow = () => {
  const { setTimerState, isHardMode } = useSettingsStore();
  const { setIslands, setBridges } = useBoardStore();
  const [date, setDate] = useState(getTodayDate());
  const [isReadyToRelease, setIsReadyToRelease] = useState(false);
  const timeoutIds = useRef([]);

  const goDark = () => {
    const app = document.getElementById("app");
    app.classList.add("time-effect-dark");
    timeoutIds.current.push(setTimeout(() => setIsReadyToRelease(true), 5000));
  };

  const handleMouseDown = () => {
    const currentDate = getTodayDate();
    if (date.day === currentDate.day)
      timeoutIds.current.push(setTimeout(goDark, 1000));
  };

  const handleMouseNotDown = () => {
    const app = document.getElementById("app");
    if (isReadyToRelease) {
      const isHardMode = localStorage.getItem("diff") === "hard";
      const nextIslands = getTomorrowLevel(isHardMode);
      app.classList.replace("time-effect-dark", "time-effect-flash");
      setTimeout(() => {
        setDate(getTomorrowDate());
        setIslands(nextIslands);
        setBridges({});
        setTimerState("init");
        app.classList.replace("time-effect-flash", "time-effect-end");
      }, 1000);
      setTimeout(() => app.classList.remove("time-effect-end"), 6000);
      setIsReadyToRelease(false);
    } else {
      app.classList.remove("time-effect-dark");
      timeoutIds.current.map((id) => clearTimeout(id));
      timeoutIds.current = [];
    }
  };

  useEffect(() => {
    setDate(getTodayDate());
  }, [isHardMode]);

  return {
    date,
    handleMouseDown,
    handleMouseNotDown,
  };
};
