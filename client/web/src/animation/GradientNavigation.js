import React, { useEffect } from "react";
import Gradient from "animation/Gradient";
function GradientNavigation() {
  var gradient = new Gradient();
  useEffect(() => {
    const timer = setTimeout(() => {
      gradient.initGradient("#gradient-canvas");
    }, 60);
    return () => clearTimeout(timer);
  });
  return <canvas className="gradient-canvas" id="gradient-canvas"></canvas>;
}

export default GradientNavigation;
