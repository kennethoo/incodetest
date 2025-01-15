import React, { useEffect } from "react";
import logo from "logo.png";
import styled from "styled-components";
import useUser from "hooks/useUser";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useCheckLogin from "hooks/useCheckLogin";
const Container = styled.div`
  width: 100%;
  height: 100vh;
  height: 100dvh;
`;

function Loading({ redirect = false }) {
  const navigate = useNavigate();
  const { currentStatus, userLoginEnum } = useCheckLogin();

  if (redirect) {
    if (currentStatus === userLoginEnum.notLogin) {
      setTimeout(() => {
        navigate("/hello");
      }, 100);
    } else if (currentStatus === userLoginEnum.login) {
      setTimeout(() => {
        navigate("/app/home");
      }, 100);
    }
  }

  return (
    <Container>
      <div className="wraprkrrnrnjn">
        <div className="logo-sceeen">
          <img src={logo} alt="logo" />
        </div>
      </div>
    </Container>
  );
}

export default Loading;
