import { useEffect } from "react";
import "./App.css";
import MainPage from "./pages/MainPage/MainPage";
import useSettingsStore from "./stores/settingsStore";

function App() {
  const { toggleIsDarkMode, togglePause } = useSettingsStore();

  useEffect(() => {
    const handleHotKeys = (event) => {
      if (event.code === "KeyD") toggleIsDarkMode();
      else if (event.code === "Space") togglePause();
    };

    document.addEventListener("keyup", handleHotKeys);
    return () => document.removeEventListener("keyup", handleHotKeys);
  }, []);

  return <MainPage />;
}

export default App;
