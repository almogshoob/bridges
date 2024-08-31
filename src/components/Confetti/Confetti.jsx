import Lottie from "lottie-react";
import { useEffect } from "react";
import lottieConfetti from "../../assets/lottie/lottie-confetti.json";

export const Confetti = ({ lottieRef }) => {
  useEffect(() => {
    lottieRef.current.pause();
  }, []);

  return (
    <Lottie
      id="lottie-confetti"
      animationData={lottieConfetti}
      lottieRef={lottieRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 3,
        display: "none",
        pointerEvents: "none",
      }}
      onLoopComplete={() => {
        lottieRef.current.pause();
        const lottie = document.getElementById("lottie-confetti");
        lottie.style.setProperty("display", "none");
      }}
    />
  );
};
