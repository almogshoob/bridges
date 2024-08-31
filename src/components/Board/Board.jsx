import { useRef, useState } from "react";
import "../../App.css";
import { RestartIcon, UndoIcon } from "../../assets/icons";
import { Bridge, Island, Timer } from "../../components";
import useBoardStore from "../../stores/boardStore";
import useSettingsStore from "../../stores/settingsStore";
import { getBridgeId, getNeighbours, isValidBridge } from "../../utils/utils";

export const Board = () => {
  const { timerState, setTimerState } = useSettingsStore();
  const {
    islands,
    bridges,
    updateNeighbour,
    setBridgeValue,
    removeBridge,
    restartBoard,
  } = useBoardStore();
  const [originCoordinates, setOriginCoordinates] = useState("");
  const gameStack = useRef([]).current;
  const restartCounter = useRef(0);

  const updateNeighbours = (bridgeId, update) => {
    getNeighbours(bridgeId).forEach((islandId) => {
      updateNeighbour(islandId, update);
    });
  };

  const setBridge = (bridgeId, value, isUndo = false) => {
    const prevBridgeValue = bridges[bridgeId] || 0;
    updateNeighbours(bridgeId, value - prevBridgeValue);
    if (!isUndo) gameStack.push({ bridgeId: bridgeId, value: prevBridgeValue });
    if (value === 0) removeBridge(bridgeId);
    else setBridgeValue(bridgeId, value);
  };

  const handleIslandDown = (event) => {
    setOriginCoordinates(event.target.id);
  };

  const handleBoardLeave = () => {
    setOriginCoordinates("");
  };

  const handleIslandUp = (event) => {
    const destCoordinates = event.target.id;
    const bridgeId = getBridgeId(originCoordinates, destCoordinates);
    if (
      originCoordinates &&
      destCoordinates !== originCoordinates &&
      isValidBridge(bridgeId, bridges, islands)
    ) {
      if (timerState !== "run") setTimerState("run");
      const prevBridgeValue = bridges[bridgeId] || 0;
      setBridge(bridgeId, (prevBridgeValue + 1) % 3);
    }
    setOriginCoordinates("");
  };

  const handleUndo = () => {
    const lastMove = gameStack.pop();
    if (lastMove) {
      const { bridgeId, value } = lastMove;
      setBridge(bridgeId, value, true);
    }
  };

  const handleRotate = () => {
    const board = document.getElementById("board-wrapper");
    board.classList.add("rotate");
    setTimeout(() => board.classList.remove("rotate"), 0);
  };

  const handleRestart = () => {
    restartCounter.current = restartCounter.current + 1;
    if (restartCounter.current === 1) {
      setTimeout(() => (restartCounter.current = 0), 1000);
      restartBoard();
      gameStack.length = 0;
    } else if (restartCounter.current === 4) {
      handleRotate();
      restartCounter.current = 0;
    }
  };

  const handleFlipBoard = (event) => {
    if (event.target.id === "board") {
      const board = document.getElementById("board-wrapper");
      board.classList.toggle("flipped");
    }
  };

  return (
    <div className="column">
      <div className="board-top | row">
        <div
          className="icon-button | opacity-hover"
          onClick={handleUndo}
          tooltip-text="ביטול"
        >
          <UndoIcon />
        </div>
        <Timer />
        <div
          className="icon-button | opacity-hover"
          onClick={handleRestart}
          tooltip-text="מהתחלה"
        >
          <RestartIcon />
        </div>
      </div>
      <div
        id="board-wrapper"
        className="board-wrapper"
        onMouseLeave={handleBoardLeave}
        onMouseUp={handleBoardLeave}
        onDoubleClick={handleFlipBoard}
      >
        <div
          id="board"
          className="board"
          style={{ pointerEvents: timerState === "finish" ? "none" : "unset" }}
        >
          {Object.keys(islands).map((islandId) => (
            <Island
              key={islandId}
              islandId={islandId}
              value={islands[islandId].value}
              bridges={islands[islandId].bridges}
              handleIslandDown={handleIslandDown}
              handleIslandUp={handleIslandUp}
            />
          ))}
          {Object.keys(bridges).map((bridgeId) => (
            <Bridge
              key={bridgeId}
              bridgeId={bridgeId}
              value={bridges[bridgeId]}
              setBridge={setBridge}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
