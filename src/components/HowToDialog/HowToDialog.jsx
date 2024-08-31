import { useState } from "react";
import "../../App.css";
import { NextPageIcon } from "../../assets/icons";
import { Dialog } from "../../templates";
import {
  e1FromLight,
  e1ToLight,
  e2FromLight,
  e2ToLight,
  e3FromLight,
  e3ToLight,
  e4FromLight,
  e4ToLight,
  e1FromDark,
  e1ToDark,
  e2FromDark,
  e2ToDark,
  e3FromDark,
  e3ToDark,
  e4FromDark,
  e4ToDark,
} from "../../assets/images/example-board";
import useSettingsStore from "../../stores/settingsStore";

export const HowToDialog = ({ open, onClose }) => {
  const { isDarkMode } = useSettingsStore();
  const [exampleIndex, setExampleIndex] = useState(0);
  const exampleText = [
    <p>
      לאי המסומן ב3 יש רק שני שכנים, לכל שכן הוא יכול לחבר לכל היותר שני גשרים,
      לכן הוא חייב לחבר <u>לפחות</u> גשר אחד לכל אחד מהם.
    </p>,
    <p>
      כעת לאי משמאל המסומן ב3 נחסמה האופציה לחבר גשר לאי מימינו, כלומר נשארו לו
      רק שני שכנים פנויים. לכן באותה השיטה נחבר לפחות גשר אחד לכל שכן.
    </p>,
    <p>
      לאי המסומן ב5 נותרו שלוש גשרים לחבר ורק 2 שכנים שנותרו פנויים, לכן באותה
      השיטה נחבר לפחות גשר אחד לכל שכן.
    </p>,
    <p>
      שימו לב! חשוב לחבר את כל האיים לקבוצה <u>אחת</u>, למשל כאן האי המסומן ב2
      חייב לחבר את הגשר השני שלו לשכן משמאלו, חיבור גשר לשכן המסומן ב1 יצור
      קבוצת איים מנותקת מהשאר
    </p>,
  ];
  const exampleImages = isDarkMode
    ? [
        { from: e1FromDark, to: e1ToDark },
        { from: e2FromDark, to: e2ToDark },
        { from: e3FromDark, to: e3ToDark },
        { from: e4FromDark, to: e4ToDark },
      ]
    : [
        { from: e1FromLight, to: e1ToLight },
        { from: e2FromLight, to: e2ToLight },
        { from: e3FromLight, to: e3ToLight },
        { from: e4FromLight, to: e4ToLight },
      ];

  const handleNext = () => {
    setExampleIndex((prev) => Math.min(prev + 1, 3));
  };
  const handlePrev = () => {
    setExampleIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleClose = () => {
    setExampleIndex(0);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      style={{
        backgroundColor: "var(--app-background-color)",
        background: "var(--app-background)",
      }}
    >
      <div className="example-dialog">
        <div className="example-img-panel | row">
          <NextPageIcon
            onClick={handlePrev}
            className="example-nav prev | button-like opacity-hover"
            style={{ visibility: exampleIndex !== 0 ? "visible" : "hidden" }}
          />
          <img src={exampleImages[exampleIndex].from} className="example-img" />
          <img src={exampleImages[exampleIndex].to} className="example-img" />
          <NextPageIcon
            onClick={handleNext}
            className="example-nav next | button-like opacity-hover"
            style={{ visibility: exampleIndex !== 3 ? "visible" : "hidden" }}
          />
        </div>
        {exampleText[exampleIndex]}
      </div>
    </Dialog>
  );
};
