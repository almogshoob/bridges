import React, { useState } from "react";
import "../../App.css";
import { HelpIcon, InfoIcon } from "../../assets/icons";
import { HowToModal } from "../HowToModal/HowToModal";

export const HowTo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="how-to | column">
      <section>
        <h3>איך משחקים?</h3>
        <ul>
          <li>חברו את כל האיים לקבוצה אחת בעזרת גשרים</li>
          <li>המספרים מציינים את מספר הגשרים היוצאים מכל אי</li>
          <li>בין כל זוג איים יכולים לחבר עד שני גשרים</li>
          <li>גשרים לא יכולים לחצות איים או גשרים אחרים</li>
          <li>גשרים יכולים לחבר בכיוון אופקי או אנכי בלבד</li>
        </ul>
      </section>
      <div className="help | column">
        <div className="row">
          <InfoIcon className="icon" />
          <p>כדי לחבר גשר לחצו על 2 איים אחד אחרי השני</p>
        </div>
        <div className="row fit-content button-like" onClick={toggleModal}>
            <HelpIcon className="icon" />
            <p>לא הבנתי תן דוגמה</p>
          </div>
      </div>
      <HowToModal open={isModalOpen} onClose={toggleModal} />
    </div>
  );
};
