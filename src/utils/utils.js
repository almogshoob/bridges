import { easyLevels, hardLevels } from "../assets/data";

const INIT_DATE = new Date("12/12/2023");
const DAY_IN_MS = 1000 * 60 * 60 * 24;

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

const getDate = (date) => {
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  return { day, month };
};

export const getTodayDate = () => getDate(new Date());

const initIslandsFromData = (jsonLevel) =>
  Object.keys(jsonLevel).reduce((islandsObject, islandId) => {
    islandsObject[islandId] = {
      value: jsonLevel[islandId],
      bridges: 0,
    };
    return islandsObject;
  }, {});

const differenceInDays = (startDate, endDate) => Math.floor(Math.abs(endDate - startDate) / DAY_IN_MS);

const getLevel = (date, isHardMode) => {
  return initIslandsFromData(
    isHardMode
      ? hardLevels[differenceInDays(INIT_DATE, date) % hardLevels.length]
      : easyLevels[differenceInDays(INIT_DATE, date) % easyLevels.length]
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

// use on Settings useEffect instead getTodayLevel
// change --grid-size and make bridge thickness in relation to it
// export const getBigLevel = () => initIslandsFromData({
//   "01-00": 1,
//   "03-00": 1,
//   "05-00": 3,
//   "07-00": 2,
//   "10-00": 2,
//   "12-00": 4,
//   "14-00": 2,
//   "17-00": 4,
//   "20-00": 2,
//   "22-00": 2,
//   "24-00": 2,
//   "00-01": 1,
//   "06-01": 3,
//   "08-01": 2,
//   "11-01": 2,
//   "16-01": 2,
//   "18-01": 2,
//   "23-01": 2,
//   "01-02": 4,
//   "04-02": 2,
//   "12-02": 5,
//   "14-02": 2,
//   "17-02": 2,
//   "19-02": 3,
//   "21-02": 2,
//   "24-02": 2,
//   "00-03": 2,
//   "05-03": 2,
//   "07-03": 1,
//   "09-03": 2,
//   "11-03": 3,
//   "18-03": 1,
//   "23-03": 2,
//   "01-04": 6,
//   "04-04": 4,
//   "06-04": 4,
//   "08-04": 5,
//   "10-04": 3,
//   "12-04": 6,
//   "14-04": 5,
//   "16-04": 4,
//   "19-04": 7,
//   "21-04": 5,
//   "24-04": 2,
//   "00-05": 2,
//   "05-05": 1,
//   "11-05": 1,
//   "15-05": 2,
//   "18-05": 1,
//   "23-05": 2,
//   "01-06": 5,
//   "04-06": 5,
//   "06-06": 5,
//   "08-06": 5,
//   "10-06": 5,
//   "12-06": 7,
//   "14-06": 3,
//   "17-06": 2,
//   "19-06": 5,
//   "24-06": 2,
//   "00-07": 2,
//   "05-07": 1,
//   "07-07": 3,
//   "09-07": 2,
//   "21-07": 5,
//   "23-07": 5,
//   "08-08": 2,
//   "10-08": 5,
//   "12-08": 4,
//   "15-08": 4,
//   "17-08": 7,
//   "19-08": 5,
//   "01-09": 5,
//   "04-09": 6,
//   "06-09": 1,
//   "14-09": 3,
//   "24-09": 2,
//   "00-10": 3,
//   "05-10": 4,
//   "07-10": 2,
//   "10-10": 5,
//   "12-10": 3,
//   "15-10": 3,
//   "17-10": 5,
//   "19-10": 5,
//   "21-10": 5,
//   "23-10": 4,
//   "01-11": 3,
//   "04-11": 4,
//   "11-11": 2,
//   "14-11": 5,
//   "16-11": 1,
//   "20-11": 1,
//   "24-11": 2,
//   "00-12": 3,
//   "03-12": 1,
//   "05-12": 4,
//   "08-12": 3,
//   "10-12": 4,
//   "13-12": 1,
//   "15-12": 2,
//   "19-12": 3,
//   "21-12": 2,
//   "04-13": 1,
//   "17-13": 1,
//   "20-13": 5,
//   "23-13": 4,
//   "01-14": 3,
//   "03-14": 4,
//   "05-14": 6,
//   "07-14": 4,
//   "09-14": 3,
//   "12-14": 2,
//   "14-14": 4,
//   "16-14": 3,
//   "19-14": 2,
//   "24-14": 2,
//   "00-15": 2,
//   "10-15": 2,
//   "15-15": 2,
//   "17-15": 2,
//   "20-15": 6,
//   "23-15": 3,
//   "01-16": 1,
//   "05-16": 5,
//   "08-16": 2,
//   "12-16": 5,
//   "14-16": 5,
//   "16-16": 3,
//   "00-17": 2,
//   "03-17": 4,
//   "09-17": 2,
//   "15-17": 1,
//   "17-17": 2,
//   "19-17": 1,
//   "24-17": 2,
//   "01-18": 2,
//   "05-18": 5,
//   "08-18": 5,
//   "10-18": 2,
//   "12-18": 4,
//   "14-18": 5,
//   "16-18": 5,
//   "18-18": 5,
//   "20-18": 7,
//   "23-18": 5,
//   "00-19": 1,
//   "09-19": 2,
//   "11-19": 2,
//   "13-19": 1,
//   "17-19": 1,
//   "19-19": 1,
//   "24-19": 2,
//   "01-20": 5,
//   "03-20": 7,
//   "05-20": 6,
//   "08-20": 5,
//   "10-20": 4,
//   "12-20": 3,
//   "14-20": 5,
//   "16-20": 3,
//   "18-20": 4,
//   "21-20": 1,
//   "23-20": 5,
//   "00-21": 2,
//   "11-21": 1,
//   "13-21": 2,
//   "15-21": 3,
//   "17-21": 2,
//   "19-21": 2,
//   "24-21": 2,
//   "05-22": 4,
//   "07-22": 1,
//   "10-22": 2,
//   "12-22": 3,
//   "14-22": 1,
//   "20-22": 2,
//   "23-22": 4,
//   "01-23": 4,
//   "03-23": 4,
//   "06-23": 1,
//   "08-23": 2,
//   "13-23": 1,
//   "15-23": 3,
//   "18-23": 3,
//   "24-23": 1,
//   "00-24": 2,
//   "02-24": 2,
//   "05-24": 2,
//   "07-24": 1,
//   "10-24": 2,
//   "12-24": 2,
//   "14-24": 1,
//   "17-24": 2,
//   "19-24": 3,
//   "21-24": 2,
//   "23-24": 2
// });