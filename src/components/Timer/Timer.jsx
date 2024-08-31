import { useEffect, useMemo, useState } from "react";
import "../../App.css";
import useSettingsStore from "../../stores/settingsStore";

export const Timer = () => {
  const { timerState, isHardMode } = useSettingsStore();
  const [seconds, setSeconds] = useState(0);
  const [intervalId, setIntervalId] = useState();

  const formatTimer = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const timerString = useMemo(() => {
    return formatTimer(seconds);
  }, [seconds]);

  const startTimer = () => {
    const id = setInterval(() => setSeconds((prev) => prev + 1), 1000);
    setIntervalId(id);
  };

  const stopTimer = () => {
    clearInterval(intervalId);
    const lastWin = JSON.parse(localStorage.getItem("last-win") || "{}");
    const lastWinInMode = isHardMode ? lastWin?.hard : lastWin?.easy;
    if (
      timerString !== "00:00" && // TODO why?
      lastWinInMode?.date !== new Date().toLocaleDateString()
    ) {
      localStorage.setItem(
        "last-win",
        JSON.stringify({
          ...lastWin,
          [isHardMode ? "hard" : "easy"]: {
            date: new Date().toLocaleDateString(),
            time: timerString,
          },
        })
      );
    }
  };

  const pauseTimer = () => {
    clearInterval(intervalId);
  };

  const initTimer = () => {
    setSeconds(0);
    clearInterval(intervalId);
  };

  useEffect(() => {
    if (timerState === "run") startTimer();
    else if (timerState === "finish") stopTimer();
    else if (timerState === "pause") pauseTimer();
    else if (timerState === "init") initTimer();
  }, [timerState]);

  return <div className="timer">{timerString}</div>;
};
