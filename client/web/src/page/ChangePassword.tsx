import React, { useState } from "react";
import TopNavigation from "landing/TopNavigation";
import One from "recover/one";
import Two from "recover/two";
import Three from "recover/three";

const ChangePassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [nav, setNav] = useState(false);

  const updateEmail = (data) => {
    setEmail(data);
  };

  const move = (data) => {
    setStep(data);
  };

  const openNav = (data) => {
    setNav(data);
  };

  const renderStep = () => {
    if (step === 1) {
      return <One updateEmail={updateEmail} move={move} />;
    } else if (step === 2) {
      return <Two email={email} move={move} />;
    } else {
      return <Three email={email} />;
    }
  };

  return (
    <div id="container">
      <TopNavigation />
      <div className="div-hold-box">{renderStep()}</div>
    </div>
  );
};

export default ChangePassword;
