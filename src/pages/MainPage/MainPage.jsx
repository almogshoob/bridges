import { useRef } from "react";
import {
  Board,
  Confetti,
  Credits,
  DateDisplay,
  DoneButton,
  Fail,
  HowTo,
  Settings,
  Title,
} from "../../components";
import useSettingsStore from "../../stores/settingsStore";

// TODO make bg of body not App (theme on root like color-guesser)

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
        <Title />
        <Board />
        <DoneButton
          lottieConfettiRef={lottieConfettiRef}
          lottieFailRef={lottieFailRef}
        />
        <HowTo />
      </div>
      <Fail lottieRef={lottieFailRef} />
      <Confetti lottieRef={lottieConfettiRef} />
      <Credits />
    </div>
  );
};

export default MainPage;
