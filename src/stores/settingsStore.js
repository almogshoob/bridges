import { create } from "zustand";

const useSettingsStore = create((set, get) => ({
  isHardMode: localStorage.getItem("diff") === "hard",
  toggleIsHardMode: () => set((state) => ({ isHardMode: !state.isHardMode })),
  isDarkMode: localStorage.getItem("theme") === "dark",
  toggleIsDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  timerState: "init",
  setTimerState: (param) => set((state) => ({ timerState: typeof param === "function" ? param(state.timerState) : param })),
  togglePause: () => {
    const currentState = get().timerState;
    if (currentState === "run") set({ timerState: "pause" })
    else if (currentState === "pause") set({ timerState: "run" })
  }
}));

export default useSettingsStore;