import React from "react";
import TopNavigation from "landing/TopNavigation";

const LoginCard = ({ children }) => {
  return (
    <div id="container">
      <TopNavigation />
      <div className="div-hold-box">{children}</div>
    </div>
  );
};

export default LoginCard;
