import { create } from "zustand";
import { getTodayLevel } from "../utils/utils";

const isHardMode = localStorage.getItem("diff") === "hard";

const useBoardStore = create((set, get) => ({
  islands: getTodayLevel(isHardMode),
  setIslands: (islands) => set(() => ({ islands })),
  bridges: {},
  setBridges: (bridges) => set(() => ({ bridges })),
  updateNeighbour: (islandId, bridgesUpdate) =>
    set((state) => ({
      islands: {
        ...state.islands,
        [islandId]: {
          ...state.islands[islandId],
          bridges: state.islands[islandId].bridges + bridgesUpdate,
        },
      },
    })),
  setBridgeValue: (bridgeId, value) =>
    set((state) => ({
      bridges: { ...state.bridges, [bridgeId]: value },
    })),
  removeBridge: (bridgeId) =>
    set((state) => {
      const newBridges = { ...state.bridges };
      delete newBridges[bridgeId];
      return { bridges: newBridges };
    }),
  restartBoard: () =>
    set((state) => {
      const newIslands = { ...state.islands };
      Object.keys(newIslands).forEach((islandId) => {
        newIslands[islandId].bridges = 0;
      });
      return { islands: newIslands, bridges: {} };
    }),
}));

export default useBoardStore;