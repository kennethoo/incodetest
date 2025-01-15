import React from "react";
import GoogleLoginAuth from "Components/auth/GoogleLoginAuth";
import styled from "styled-components";
import { Link } from "react-router-dom";
import LoginWithEmail from "Components/Login/LoginWithEmail";

const Container = styled.div``;

const BigWrapper = styled.div`
  width: 95%;
  max-width: 450px;
  flex-direction: column;
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  border-radius: 10px;

  border: 1px solid var(--main-bg-cool-rgb);
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  color: white; /* Light gray for text */
  font-size: 14px;
  position: relative;
`;

const LoginWithEmailCTA = styled.button`
  width: 100%;
  height: 45px;
  margin-right: 10px;
  border-radius: 30px;
  font-size: 15px;
  background-color: #6f56e5;
  border: 0;
  box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  color: white;
`;
const LoginTitle = styled.div`
  display: flex;
  justify-content: center;
`;
const InitialStep = ({ onChooseEmail }) => {
  return (
    <BigWrapper>
      <Container className="wrappgngnngpr">
        <LoginTitle className="sign">Welcome Back</LoginTitle>
        <GoogleLoginAuth />
        <Divider className="or-divider">
          <span>OR</span>
        </Divider>
        <LoginWithEmail />
      </Container>
    </BigWrapper>
  );
};

export default InitialStep;
