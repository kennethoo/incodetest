import React, { useState } from "react";
import LoginCard from "Components/Login/LoginCard";
import InitialStep from "Components/Login/InitialStep";
import LoginWithEmail from "Components/Login/LoginWithEmail";
import meettumApi from "ApiServiveGateWay/apiConfig";
import useLogger from "hooks/useLogger";

const Login = () => {
  const [step, setStep] = useState("email"); // 'initial' or 'email'
  const [loading, setLoading] = useState(false);
  const logger = useLogger();

  const handleEmailSubmit = async ({ username, password }) => {
    try {
      setLoading(true);
      const result = await meettumApi.post("/api/login", {
        email: username.toLowerCase(),
        password,
        region: "",
        city: "",
      });
      const { succeeded } = result.data;

      if (!succeeded) {
        alert("Invalid email or password");
      } else {
        window.location.reload();
      }
    } catch (error) {
      logger({
        isErrorMessage: true,
        message: error.message,
        fileName: "Login.tsx",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginCard>
      <InitialStep onChooseEmail={() => setStep("email")} />
    </LoginCard>
  );
};

export default Login;
