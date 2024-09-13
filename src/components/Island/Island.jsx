import useBoardStore from "../../stores/boardStore";

export const Island = ({
  islandId,
  value,
  bridges,
  handleIslandDown,
  handleIslandUp,
}) => {
  const { cellSize } = useBoardStore();
  const isDone = bridges === value;
  const isWrong = bridges > value;

  return (
    <div
      className={`island ${isDone ? "v" : isWrong ? "x" : ""}`}
      style={{
        top: Number(islandId.substring(3, 5)) * cellSize + "px",
        left: Number(islandId.substring(0, 2)) * cellSize + "px",
      }}
      id={islandId}
      onMouseDown={(e) => {
        handleIslandDown(e.target.id);
      }}
      onMouseUp={(e) => {
        handleIslandUp(e.target.id);
      }}
      onTouchStart={(e) => {
        handleIslandDown(e.target.id);
      }}
      onTouchEnd={(e) => {
        const { pageX, pageY } = e.changedTouches[0];
        const islandId = document.elementsFromPoint(pageX, pageY)[0].id;
        handleIslandUp(islandId);
      }}
    >
      <svg
        width={"100%"}
        height={"100%"}
        viewBox="0 0 100 100"
        style={{ pointerEvents: "none" }}
      >
        <circle
          cx="50"
          cy="50"
          r="46"
          stroke="black"
          strokeWidth="8"
          fill="hsl(50, 70%, 70%)"
        />
        <text
          x="50%"
          y="57%"
          fill="black"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="70px"
        >
          {value}
        </text>
      </svg>
    </div>
  );
};
