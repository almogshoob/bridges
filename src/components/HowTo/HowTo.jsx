import React, { useState } from "react";
import "../../App.css";
import { HelpIcon, InfoIcon } from "../../assets/icons";
import { HowToModal } from "../../components";

export const HowTo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="how-to | column">
      <h1 className="page-title">גשרים</h1>
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
      <HowToModal open={isModalOpen} onClose={toggleModal} />
    </div>
  );
};
