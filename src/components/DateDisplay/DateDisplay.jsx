import "../../App.css";
import { getDate } from "../../utils/utils";

export const DateDisplay = () => {
  const date = getDate(new Date());

  return (
    <p className="date">
      {date.day}/{date.month}
    </p>
  );
};
