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
      else if (event.code === "KeyC") {
        const credits = document.getElementById("credits");
        if (!credits.classList.contains("display")) {
          credits.classList.add("display");
          setTimeout(() => credits.classList.remove("display"), 8500);
        }
      }
    };

    document.addEventListener("keyup", handleHotKeys);
    return () => document.removeEventListener("keyup", handleHotKeys);
  }, []);

  return <MainPage />;
}

export default App;
