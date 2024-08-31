import "../../App.css";
import useBoardStore from "../../stores/boardStore";
import { getBridge } from "../../utils/utils";

export const Bridge = ({ bridgeId, value, setBridge }) => {
  const { cellSize } = useBoardStore();

  const bridge = getBridge(bridgeId);
  const size = bridge.constAxis === "x" ? "height" : "width";
  const borderWidth = "6px";
  const borders =
    size === "width"
      ? value === 1
        ? {
            borderBottomWidth: borderWidth,
          }
        : {
            borderTopWidth: borderWidth,
            borderBottomWidth: borderWidth,
            height: borderWidth,
          }
      : value === 1
      ? {
          borderRightWidth: borderWidth,
        }
      : {
          borderLeftWidth: borderWidth,
          borderRightWidth: borderWidth,
          width: borderWidth,
        };
  const center =
    size === "width"
      ? {
          transform: "translateY(-50%)",
        }
      : {
          transform: "translateX(-50%)",
        };
  const computedStyle = {
    top: `${(Number(bridgeId.substring(3, 5)) + 0.5) * cellSize}px`,
    left: `${(Number(bridgeId.substring(0, 2)) + 0.5) * cellSize}px`,
    [size]: `${(bridge.parallelEnd - bridge.parallelStart) * cellSize}px`,
    ...borders,
    ...center,
  };

  const removeBridge = () => {
    setBridge(bridgeId, 0);
  };

  return (
    <div className="bridge" style={computedStyle} onClick={removeBridge} />
  );
};
