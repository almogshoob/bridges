import { Fragment } from "react";

const BoardGrid = ({ boardSize, className }) => {
  const gridSize = boardSize - 1;
  const cellSize = 100 / gridSize;
  const strokeWidth = 1.75;

  const lineProps = {
    stroke: "black",
    strokeWidth: `${strokeWidth}px`,
    strokeDasharray: "1,4",
    vectorEffect: "non-scaling-stroke",
  };

  const getOffset = (index) =>
    index === 0 ? strokeWidth / 10 : index === gridSize ? strokeWidth / -10 : 0;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={className}
    >
      {Array(gridSize + 1)
        .fill(0)
        .map((_, i) => {
          return (
            <Fragment key={i}>
              <line
                x1={i * cellSize + getOffset(i)}
                x2={i * cellSize + getOffset(i)}
                y1="0"
                y2="100"
                {...lineProps}
              />
              <line
                y1={i * cellSize + getOffset(i)}
                y2={i * cellSize + getOffset(i)}
                x1="0"
                x2="100"
                {...lineProps}
              />
            </Fragment>
          );
        })}
    </svg>
  );
};

export { BoardGrid };
