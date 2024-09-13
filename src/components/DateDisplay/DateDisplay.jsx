import { useEffect, useState } from "react";
import "../../App.css";
import useSettingsStore from "../../stores/settingsStore";
import { getDate } from "../../utils/utils";

export const DateDisplay = () => {
  const { isHardMode } = useSettingsStore();
  const [date, setDate] = useState(getDate(new Date()));

  // TODO make hard mode stay in tomorrow
  useEffect(() => {
    setDate(getDate(new Date()));
  }, [isHardMode]);

  return (
    <p className="date">
      {date.day}/{date.month}
    </p>
  );
};
