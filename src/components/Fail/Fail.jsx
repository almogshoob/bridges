import Lottie from "lottie-react";
import { useEffect } from "react";
import lottieFail from "../../assets/lottie/lottie-fail.json";

export const Fail = ({ lottieRef }) => {
  useEffect(() => {
    lottieRef.current.pause();
  }, []);

  return (
    <Lottie
      id="lottie-fail"
      animationData={lottieFail}
      lottieRef={lottieRef}
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        translate: "-50% -50%",
        width: "20%",
        zIndex: 3,
        display: "none",
        filter: "contrast(0.75)",
      }}
      onLoopComplete={() => {
        lottieRef.current.pause();
        const lottie = document.getElementById("lottie-fail");
        lottie.style.setProperty("display", "none");
      }}
    />
  );
};
