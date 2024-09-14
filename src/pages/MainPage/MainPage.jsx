import { useRef } from "react";
import { Board, Confetti, DateDisplay, Fail, Settings } from "../../components";
import useSettingsStore from "../../stores/settingsStore";

// TODO navbar, hover

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
      <nav className="nav">
        <Settings />
        <DateDisplay />
        {/* <HowTo /> */}
      </nav>
      <Board
        lottieConfettiRef={lottieConfettiRef}
        lottieFailRef={lottieFailRef}
      />
      <Fail lottieRef={lottieFailRef} />
      <Confetti lottieRef={lottieConfettiRef} />
    </div>
  );
};

export default MainPage;
