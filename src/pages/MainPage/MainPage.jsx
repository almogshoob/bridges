import { useRef } from "react";
import {
  Board,
  Confetti,
  DateDisplay,
  DoneButton,
  Fail,
  HowTo,
  Settings,
} from "../../components";
import useSettingsStore from "../../stores/settingsStore";

// TODO how to example, hover (button, opacity-hover, tooltips)

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
    >
      <Settings />
      <DateDisplay />
      <div className="main-wrapper">
        <h1 className="page-title">גשרים</h1>
        <Board />
        <DoneButton
          lottieConfettiRef={lottieConfettiRef}
          lottieFailRef={lottieFailRef}
        />
        <HowTo />
      </div>
      <Fail lottieRef={lottieFailRef} />
      <Confetti lottieRef={lottieConfettiRef} />
    </div>
  );
};

export default MainPage;
