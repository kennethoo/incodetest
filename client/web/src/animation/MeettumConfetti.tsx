import React, { useRef, useEffect } from "react";
import Confetti from "react-confetti";
import styled from "styled-components";
import useResizeObserver from "hooks/layout/useResizeObserver";
import { useDispatch } from "react-redux";
const Container = styled.div`
  position: fixed;
  height: 100vh;
  height: 100dvh;
  width: 100%;
  z-index: 100;
`;

export default function MeettumConfetti() {
  const container = useRef();
  const dispatch = useDispatch();
  const { dimensions } = useResizeObserver(container);
  const width = dimensions?.width ? dimensions.width : 10;
  const height = dimensions?.height ? dimensions.height : 10;

  const closeLogger = () => {
    dispatch({ type: "UPDATE_CONFETTI", value: false });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      closeLogger();
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  });
  return (
    <Container ref={container}>
      <Confetti width={width} height={height} />;
    </Container>
  );
}
