import "../../App.css";
import useBoardStore from "../../stores/boardStore";
import useSettingsStore from "../../stores/settingsStore";
import { getLastTime, isSolutionCorrect, runLottie } from "../../utils/utils";

export const DoneButton = ({ lottieConfettiRef, lottieFailRef }) => {
  const { isHardMode, setTimerState } = useSettingsStore();
  const { islands, bridges } = useBoardStore();

  const lastTime = getLastTime(isHardMode);

  const handleSubmit = () => {
    if (isSolutionCorrect(islands, bridges)) {
      runLottie("lottie-confetti", lottieConfettiRef);
      setTimerState("finish");
    } else {
      runLottie("lottie-fail", lottieFailRef);
    }
  };

  return (
    <div className="done-wrapper">
      <button className="done-button" onClick={handleSubmit}>
        סיימתי
      </button>
      {lastTime && <p>סיימת היום תוך {lastTime}</p>}
    </div>
  );
};
