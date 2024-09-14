import "../../App.css";
import { getBridge } from "../../utils/utils";

export const Bridge = ({ bridgeId, value, setBridge }) => {
  const bridge = getBridge(bridgeId);
  const size = bridge.constAxis === "x" ? "height" : "width";
  const className =
    size === "width"
      ? value === 1
        ? "h single"
        : "h double"
      : value === 1
      ? "v single"
      : "v double";
  const computedStyle = {
    "--top-in-cells": Number(bridgeId.substring(3, 5)) + 0.5,
    "--left-in-cells": Number(bridgeId.substring(0, 2)) + 0.5,
    "--length-in-cells": bridge.parallelEnd - bridge.parallelStart,
  };

  const removeBridge = () => {
    setBridge(bridgeId, 0);
  };

  return (
    <div
      className={`bridge ${className}`}
      style={computedStyle}
      onClick={removeBridge}
    />
  );
};
