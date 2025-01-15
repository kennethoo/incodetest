import React, { useRef, useEffect } from "react";
import useResizeObserver from "hooks/layout/useResizeObserver";
import styled from "styled-components";
import useEditorTheme from "hooks/codeEngine/useEditorTheme";
import Codeboard from "ApiServiveGateWay/Codeboard";
import useUser from "hooks/useUser";
const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 100px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  overflow: hidden;
`;

const CodeSection = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  height: 100%;
`;

const CodeSectionWrapper = styled.div`
  width: 100%;
  height: 100%;
  font-size: 15px;
`;

const PreviewCode = ({ code, extension, projectId, filename }): JSX.Element => {
  const codeSectionRef = useRef();
  const codebaord = useRef(null);
  const { user } = useUser();
  useEffect(() => {
    codebaord.current = new Codeboard({
      instance: "id",
      username: user.username,
      ref: codeSectionRef.current,
      extension,
      projectId,
      filename,
      userId: user.userId,
    });
    codebaord.current.setupBasicPreviewCodeboard(code);
    return () => {
      codebaord.current.destroy();
    };
  }, []);

  return (
    <Container>
      <CodeSection>
        <CodeSectionWrapper ref={codeSectionRef} />
      </CodeSection>
    </Container>
  );
};

export default PreviewCode;
