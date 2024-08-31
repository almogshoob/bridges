import levels13 from "../assets/data/levels-by-date-13.json";
import levels15 from "../assets/data/levels-by-date-15.json";

export const runLottie = (id, lottieRef) => {
  const lottie = document.getElementById(id);
  lottie.style.setProperty("display", "block");
  lottieRef.current.play();
};

export const getBridgeId = (originId, destId) =>
  [originId, destId]
    .sort(
      (a, b) => Number(a.split("-").join("")) - Number(b.split("-").join(""))
    )
    .join("_");

export const getBridge = (bridgeId) => {
  if (bridgeId.substring(0, 2) === bridgeId.substring(6, 8))
    return {
      parallelAxis: "y",
      parallelStart: Math.min(
        bridgeId.substring(3, 5),
        bridgeId.substring(9, 11)
      ),
      parallelEnd: Math.max(
        bridgeId.substring(3, 5),
        bridgeId.substring(9, 11)
      ),
      constAxis: "x",
      constValue: Number(bridgeId.substring(0, 2)),
    };
  else if (bridgeId.substring(3, 5) === bridgeId.substring(9, 11))
    return {
      parallelAxis: "x",
      parallelStart: Math.min(
        bridgeId.substring(0, 2),
        bridgeId.substring(6, 8)
      ),
      parallelEnd: Math.max(bridgeId.substring(0, 2), bridgeId.substring(6, 8)),
      constAxis: "y",
      constValue: Number(bridgeId.substring(3, 5)),
    };
  else return false;
};

const isNotDiagonal = (bridgeId) => getBridge(bridgeId);

const isIslandBlock = (bridgeId, islands) => {
  const { parallelAxis, parallelStart, parallelEnd, constAxis, constValue } =
    getBridge(bridgeId);
  return Object.keys(islands).some((islandId) => {
    const islandObject = {
      x: Number(islandId.substring(0, 2)),
      y: Number(islandId.substring(3, 5)),
    };
    return (
      islandObject[constAxis] === constValue &&
      islandObject[parallelAxis] > parallelStart &&
      islandObject[parallelAxis] < parallelEnd
    );
  });
};

const isBridgeBlock = (bridgeId, bridges) => {
  const { constAxis, constValue, parallelStart, parallelEnd } =
    getBridge(bridgeId);
  return Object.keys(bridges).some((bridge) => {
    const otherBridge = getBridge(bridge);
    return (
      constAxis === otherBridge.parallelAxis &&
      constValue > otherBridge.parallelStart &&
      constValue < otherBridge.parallelEnd &&
      otherBridge.constValue > parallelStart &&
      otherBridge.constValue < parallelEnd
    );
  });
};

export const isValidBridge = (bridgeId, bridges, islands) =>
  isNotDiagonal(bridgeId) &&
  !isBridgeBlock(bridgeId, bridges) &&
  !isIslandBlock(bridgeId, islands);

export const getNeighbours = (bridgeId) => [
  bridgeId.substring(0, 5),
  bridgeId.substring(6, 12),
];

const getGraphAdjacency = (islands, bridges) => {
  const vertices = Object.keys(islands);
  const edges = Object.keys(bridges);
  const adjacency = Object.fromEntries(vertices.map((v) => [v, []]));
  for (const edge of edges) {
    const edgeVertices = edge.split("_");
    adjacency[edgeVertices[0]].push(edgeVertices[1]);
    adjacency[edgeVertices[1]].push(edgeVertices[0]);
  }
  return adjacency;
};

const dfs = (graphAdjacency, sourceVertex) => {
  const stack = [sourceVertex || Object.keys(graphAdjacency)[0]];
  const visited = new Set();
  const path = [];

  while (stack.length) {
    const currentVertex = stack.pop();

    if (!visited.has(currentVertex)) {
      visited.add(currentVertex);
      path.push(currentVertex);
      for (const neighbourVertex of graphAdjacency[currentVertex])
        stack.push(neighbourVertex);
    }
  }

  return path;
};

export const isSolutionCorrect = (islands, bridges) => {
  const islandKeys = Object.keys(islands);
  if (
    islandKeys.some(
      (islandId) => islands[islandId].value !== islands[islandId].bridges
    )
  )
    return false;

  const adjacency = getGraphAdjacency(islands, bridges);
  const connected = dfs(adjacency);
  return connected.length === islandKeys.length;
};

export const getDate = (date) => {
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  return { day, month };
};

const getDateKey = (date) => {
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  return `${month}-${day}`;
};

const initIslandsFromData = (jsonLevel) =>
  Object.keys(jsonLevel).reduce((islandsObject, islandId) => {
    islandsObject[islandId] = {
      value: jsonLevel[islandId],
      bridges: 0,
    };
    return islandsObject;
  }, {});

export const getLevel = (date, isHardMode) => {
  const dateKey = getDateKey(date);
  return initIslandsFromData(
    isHardMode ? levels13[dateKey] : levels15[dateKey]
  );
};

export const getTodayLevel = (isHardMode) => getLevel(new Date(), isHardMode);

export const getLastTime = (isHardMode) => {
  const lastWin = JSON.parse(localStorage.getItem("last-win") || "{}");
  const lastWinInMode = isHardMode ? lastWin?.hard : lastWin?.easy;
  const isFromToday = lastWinInMode?.date === new Date().toLocaleDateString();
  return isFromToday && lastWinInMode?.time;
};

/*import levelsDates from "../assets/data/levels-by-date-15.json";
export const processLevelsByDate = (jsonLevels) => {
  const newLevels = Object.values(jsonLevels);
  const levelsByDates = Object.fromEntries(
    Object.keys(levelsDates).map((date, index) => [date, newLevels[index]])
  );
  console.log(levelsByDates);
};*/