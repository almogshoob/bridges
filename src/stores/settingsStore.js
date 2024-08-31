import { create } from "zustand";

const useSettingsStore = create((set, get) => ({
  isHardMode: localStorage.getItem("diff") === "hard",
  toggleIsHardMode: () => set((state) => ({ isHardMode: !state.isHardMode })),
  isDarkMode: localStorage.getItem("theme") === "dark",
  toggleIsDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  timerState: "init",
  setTimerState: (timerState) => set(() => ({ timerState })),
}));

export default useSettingsStore;