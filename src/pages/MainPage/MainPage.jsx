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

// TODO make bg of body not App (theme on root like color-guesser)

const MainPage = () => {
  const { isHardMode, isDarkMode } = useSettingsStore();

  const lottieFailRef = useRef();
  const lottieConfettiRef = useRef();

  return (
    <div
      className={`App | ${isHardMode ? "hard-mode" : ""} ${
        isDarkMode ? "dark-mode" : ""
      }`}
    >
      <Settings />
      {/* TODO easter egg switch date */}
      <DateDisplay />
      <div className="main-wrapper">
        <h1 className="page-title">
          גשרים
          {/* TODO easter egg replace ם with hashi in japanese, add tooltip of explaination */}
          {/* <span>橋</span> */}
        </h1>
        <Board />
        <DoneButton
          lottieConfettiRef={lottieConfettiRef}
          lottieFailRef={lottieFailRef}
        />
        <HowTo />
      </div>
      <Fail lottieRef={lottieFailRef} />
      <Confetti lottieRef={lottieConfettiRef} />
      {/* TODO easter egg credits */}
    </div>
  );
};

export default MainPage;
