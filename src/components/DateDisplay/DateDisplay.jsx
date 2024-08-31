import { useEffect, useRef, useState } from "react";
import "../../App.css";
import useBoardStore from "../../stores/boardStore";
import useSettingsStore from "../../stores/settingsStore";
import { getDate, getLevel } from "../../utils/utils";

export const DateDisplay = () => {
  const { setTimerState, isHardMode } = useSettingsStore();
  const { setIslands, setBridges } = useBoardStore();
  const [date, setDate] = useState(getDate(new Date()));
  const [isReadyToRelease, setIsReadyToRelease] = useState(false);
  const timeoutIds = useRef([]);

  const goDark = () => {
    const app = document.getElementById("app");
    app.classList.add("time-effect-dark");
    timeoutIds.current.push(setTimeout(() => setIsReadyToRelease(true), 5000));
  };

  const handleMouseDown = () => {
    const currentDate = getDate(new Date());
    if (date.day === currentDate.day)
      timeoutIds.current.push(setTimeout(goDark, 1000));
  };

  const handleMouseNotDown = () => {
    const app = document.getElementById("app");
    if (isReadyToRelease) {
      const isHardMode = localStorage.getItem("diff") === "hard";
      const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
      const nextIslands = getLevel(tomorrow, isHardMode);
      app.classList.replace("time-effect-dark", "time-effect-flash");
      setTimeout(() => {
        setDate(getDate(tomorrow));
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

  // TODO make hard mode stay in tomorrow
  useEffect(() => {
    setDate(getDate(new Date()));
  }, [isHardMode]);

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
