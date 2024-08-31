import React, { useRef, useState } from "react";
import "../../App.css";
import { HelpIcon, InfoIcon } from "../../assets/icons";
import useBoardStore from "../../stores/boardStore";
import useSettingsStore from "../../stores/settingsStore";
import { getLastTime, isSolutionCorrect, runLottie } from "../../utils/utils";
import { HowToModal } from "../../components";

export const HowTo = ({ lottieConfettiRef, lottieFailRef }) => {
  const { isHardMode, setTimerState } = useSettingsStore();
  const { islands, bridges } = useBoardStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const lastTime = getLastTime(isHardMode);
  const timeoutId = useRef();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmit = () => {
    if (isSolutionCorrect(islands, bridges)) {
      runLottie("lottie-confetti", lottieConfettiRef);
      setTimerState("finish");
    } else {
      runLottie("lottie-fail", lottieFailRef);
    }
  };

  const handleEnterM = () => {
    timeoutId.current = setTimeout(() => {
      document.getElementById("title-last-letter").classList.add("hide");
      document.getElementById("japanese").classList.add("visible");
    }, 5000);
  };

  const handleLeaveM = () => {
    clearTimeout(timeoutId.current);
  };

  return (
    <div className="how-to | column">
      <h1 className="page-title">
        גשרי
        <span
          id="title-last-letter"
          onMouseEnter={handleEnterM}
          onMouseLeave={handleLeaveM}
        >
          ם
        </span>
        <span id="japanese">橋</span>
      </h1>
      <section>
        <h3>חוקים</h3>
        <ul>
          <li>חברו את כל האיים לקבוצה אחת בעזרת גשרים</li>
          <li>המספרים מציינים את מספר הגשרים היוצאים מכל אי</li>
          <li>בין כל זוג איים יכולים לחבר עד שני גשרים</li>
          <li>גשרים לא יכולים לחצות איים או גשרים אחרים</li>
          <li>גשרים יכולים לחבר בכיוון אופקי או אנכי בלבד</li>
        </ul>
        <div className="help | column">
          <div className="row">
            <InfoIcon className="icon" />
            <p>כדי לחבר גשר מתחו קו בין שני האיים תוך כדי לחיצה</p>
          </div>
          <div className="row fit-content button-like" onClick={toggleModal}>
            <HelpIcon className="icon" />
            <p>לא הבנתי תן דוגמה</p>
          </div>
        </div>
      </section>
      <div className="done-wrapper">
        <button className="done-button | h-center" onClick={handleSubmit}>
          סיימתי
        </button>
        {lastTime && <p>סיימת היום תוך {lastTime}</p>}
      </div>
      <HowToModal open={isModalOpen} onClose={toggleModal} />
    </div>
  );
};
