import { useEffect, useState } from "react";
import { SettingsIcon } from "../../assets/icons";
import useBoardStore from "../../stores/boardStore";
import useSettingsStore from "../../stores/settingsStore";
import { Toggle } from "../../templates";
import { getTodayLevel } from "../../utils/utils";

export const Settings = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { setIslands, setBridges } = useBoardStore();
  const {
    isHardMode,
    isDarkMode,
    toggleIsHardMode,
    toggleIsDarkMode,
    setTimerState,
  } = useSettingsStore();

  const toggleSettings = () => {
    setIsSettingsOpen((prev) => !prev);
  };

  useEffect(
    () => localStorage.setItem("theme", isDarkMode ? "dark" : "light"),
    [isDarkMode]
  );

  useEffect(() => {
    setBridges({});
    setIslands(getTodayLevel(isHardMode));
    setTimerState("init");
    localStorage.setItem("diff", isHardMode ? "hard" : "easy");
  }, [isHardMode]);

  return (
    <div className="settings" open={isSettingsOpen}>
      <SettingsIcon onClick={toggleSettings} />
      <div className="settings-list-wrapper">
        <div className="settings-list | column">
          <p>מצב קשה</p>
          <Toggle
            isOn={isHardMode}
            onToggle={toggleIsHardMode}
            id="hard-mode-toggle"
            className="toggle"
          />
          <p>מצב לילה</p>
          <Toggle
            isOn={isDarkMode}
            onToggle={toggleIsDarkMode}
            id="dark-mode-toggle"
            className="toggle"
          />
        </div>
      </div>
    </div>
  );
};
