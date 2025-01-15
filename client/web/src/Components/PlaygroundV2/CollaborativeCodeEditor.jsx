import React, { useEffect, useRef } from "react";
import Codeboard from "ApiServiveGateWay/Codeboard";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 500px; /* Set container height */
  border: 1px solid #44475a;
  overflow: hidden; /* Prevent scrollbars on the container */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  display: flex; /* Use flex to control child height */
  flex-direction: column;
`;

const CollaborativeCodeEditor = () => {
  const editorContainer = useRef(null);
  const collaboraion = useRef(null);

  useEffect(() => {
    collaboraion.current = new Codeboard({
      instance: "test",
      username: "kenneth",
      ref: editorContainer.current,
    });
    // collaboraion.current.setupBasicCodeboard();

    // Cleanup on component unmount
    return () => {
      // collaboraion.current.destroy();
    };
  }, []);

  return <Container ref={editorContainer} />;
};

export default CollaborativeCodeEditor;
