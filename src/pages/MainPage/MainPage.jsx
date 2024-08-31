import { useRef } from "react";
import { PauseIcon } from "../../assets/icons";
import HslGame from "../../assets/images/hsl-game.png";
import {
  Ad,
  Board,
  Confetti,
  Credits,
  DateDisplay,
  Fail,
  HowTo,
  Settings,
} from "../../components";
import config from "../../config";
import useSettingsStore from "../../stores/settingsStore";

const MainPage = () => {
  const {
    isHardMode,
    isDarkMode,
    timerState,
    toggleIsDarkMode,
    setTimerState,
  } = useSettingsStore();

  const lottieFailRef = useRef();
  const lottieConfettiRef = useRef();

  const handleKey = (event) => {
    if (event.keyCode === 68) toggleIsDarkMode();
    else if (event.keyCode === 80) {
      if (timerState === "run") setTimerState("pause");
      else if (timerState === "pause") setTimerState("run");
    } else if (event.keyCode === 67) {
      const credits = document.getElementById("credits");
      if (!credits.classList.contains("display")) {
        credits.classList.add("display");
        setTimeout(() => credits.classList.remove("display"), 8500);
      }
    }
  };

  return (
    <div
      id="app"
      className={`App | v-center ${isHardMode ? "hard-mode" : ""} ${
        isDarkMode ? "dark-mode" : ""
      }`}
      onKeyUp={handleKey}
      // TODO snake
      // onKeyDown={handleKeyDown}
      // if (event.keyCode === 39) {
      // 	setTimeout(() => console.log("snake"), 3000);
      // 	console.log("snake");
      // }
      tabIndex={0}
    >
      <div className="wrapper | row">
        <HowTo
          lottieConfettiRef={lottieConfettiRef}
          lottieFailRef={lottieFailRef}
        />
        <Board />
      </div>
      <DateDisplay />
      <Fail lottieRef={lottieFailRef} />
      <Confetti lottieRef={lottieConfettiRef} />
      <div className={`pause ${timerState === "pause" ? "visible" : ""}`}>
        <PauseIcon />
      </div>
      <Credits />
      <Settings />
      {config.SHOW_AD && (
        <Ad
          img={HslGame}
          title="New!✨"
          link="https://almogshoob.github.io/color-guesser/"
        />
      )}
    </div>
  );
};

export default MainPage;
