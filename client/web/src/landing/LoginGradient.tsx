import { useEffect } from "react";
import Gradient from "animation/Gradient";
function LoginGradient() {
  var gradient: any = new Gradient();
  useEffect(() => {
    const timer = setTimeout(() => {
      gradient.initGradient("#gradient-canvas");
    }, 60);
    return () => clearTimeout(timer);
  });
  return (
    <canvas
      style={{ width: "100%", height: "100%" }}
      className="gradient-canvas"
      id="gradient-canvas"
    ></canvas>
  );
}

export default LoginGradient;
