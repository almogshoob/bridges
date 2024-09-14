import { useRef } from "react";
import {
  Board,
  Confetti,
  DateDisplay,
  Fail,
  HowTo,
  Settings,
} from "../../components";
import useSettingsStore from "../../stores/settingsStore";

// TODO how to example, hover

const MainPage = () => {
  const { isHardMode, isDarkMode } = useSettingsStore();

  const lottieFailRef = useRef();
  const lottieConfettiRef = useRef();

  return (
    <div
      id="app"
      className={`App | ${isHardMode ? "hard-mode" : ""} ${
        isDarkMode ? "dark-mode" : ""
      }`}
      tabIndex={0}
    >
      <Settings />
      <h1 className="page-title">גשרים</h1>
      <DateDisplay />
      <Board
        lottieConfettiRef={lottieConfettiRef}
        lottieFailRef={lottieFailRef}
      />
      <HowTo />
      <Fail lottieRef={lottieFailRef} />
      <Confetti lottieRef={lottieConfettiRef} />
    </div>
  );
};

export default MainPage;
