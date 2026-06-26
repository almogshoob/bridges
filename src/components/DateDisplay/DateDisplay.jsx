import { getTodayDate } from "../../utils/utils";

export const DateDisplay = () => {
  const date = getTodayDate();

  return (
    <p className="date">
      {date.day}/{date.month}
    </p>
  );
};
