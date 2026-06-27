import { useEffect, useRef, useState } from "react";

export const Title = () => {
  const { showHashi, handleMouseEnter, handleMouseLeave } = useTitleHover();

  return (
    <h1 className="page-title">
      גשרי
      {/* TODO add tooltip of explaination */}
      <span
        className={showHashi ? "hide" : ""}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        ם
      </span>
      <span id="hashi" className={showHashi ? "visible" : ""}>
        橋
      </span>
    </h1>
  );
};

const useTitleHover = (delayMs = 5000) => {
  const timeoutRef = useRef();
  const [showHashi, setShowHashi] = useState(false);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setShowHashi(true);
    }, delayMs);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return {
    showHashi,
    handleMouseEnter,
    handleMouseLeave,
  };
};
