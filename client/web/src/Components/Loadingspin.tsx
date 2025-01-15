import React from "react";

import styled from "styled-components";

const Container = styled.div`
  display: inline-block;
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  & div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 30px;
    height: 30px;
    margin: 8px;
    border: 3px solid var(--main-bg-cool-rgb);
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #6f56e5 transparent transparent transparent;
  }

  & div:nth-child(1) {
    animation-delay: -0.45s;
  }
  & div:nth-child(2) {
    animation-delay: -0.3s;
  }
  & div:nth-child(3) {
    animation-delay: -0.15s;
  }

  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

function LoadingSpin() {
  return (
    <Container className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </Container>
  );
}

export default LoadingSpin;
