import React, { useRef, useState } from "react";
// import CodeMirror from "@uiw/react-codemirror";
// import { javascript } from "@codemirror/lang-javascript";
import useResizeObserver from "hooks/layout/useResizeObserver";
import styled from "styled-components";
import Outputs from "Components/CodeEngine/Outputs";
import DropDownOptions from "Components/shared/DropDownOptions";
import useEditorTheme from "hooks/codeEngine/useEditorTheme";
import LoadingSpin from "Components/Loadingspin";
import { apiGateway } from "ApiServiveGateWay/apiGateway";
import CodeSanBox from "Components/CodeEngine/CodeSanBox";
import Tabs from "Components/shared/Tabs";
const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 100%;

  display: flex;
`;
const CodeWrapper = styled.div`
  width: 50%;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const CodeSection = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  height: calc(100% - 50px);
  border-right: 1px solid var(--main-bg-cool-rgb);
  padding: 5px;
`;
const CodoToolBar = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 10px;
  justify-content: space-between;
  border-bottom: 1px solid var(--main-bg-cool-rgb);
  border-right: 1px solid var(--main-bg-cool-rgb);
`;

const OutputsWrapper = styled.div`
  width: 50%;
  margin: 0 auto;
  height: 100%;
  overflow: hidden;
`;

const DesktopMode = styled.div`
  display: flex;
  width: 100%;
  display: none;
  @media only screen and (min-width: 1200px) {
    display: flex;
  }
`;

const MobileMode = styled.div`
  display: flex;

  width: 100%;
  display: none;
  @media only screen and (max-width: 1200px) {
    display: flex;
  }
`;

const Code = (): JSX.Element => {
  const [value, setValue] = useState("console.log('hello world!')");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Container>
      <DesktopMode>
        <CodeWrapper>
          {/* <CodeSanBox
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setValue={setValue}
            setOutput={setOutput}
            value={value}
            isRemote={true}
          /> */}
        </CodeWrapper>
        <OutputsWrapper>
          {/* <Outputs isLoading={isLoading} output={output} /> */}
        </OutputsWrapper>
      </DesktopMode>
    </Container>
  );
};

export default Code;
