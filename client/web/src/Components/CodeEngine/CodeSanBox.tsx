import React, { useEffect, useRef, useState } from "react";
// import CodeMirror from "@uiw/react-codemirror";
import useResizeObserver from "hooks/layout/useResizeObserver";
import styled from "styled-components";
import DropDownOptions from "Components/shared/DropDownOptions";
import useEditorTheme from "hooks/codeEngine/useEditorTheme";
import { apiGateway } from "ApiServiveGateWay/apiGateway";
// import { LanguageSupport } from "@codemirror/language";
// import { markdown } from "@codemirror/lang-markdown";
// import { cpp } from "@codemirror/lang-cpp";
// import { json } from "@codemirror/lang-json";
// import { java } from "@codemirror/lang-java";
// import { python } from "@codemirror/lang-python";
// import { go } from "@codemirror/lang-go";
// import { html } from "@codemirror/lang-html";
// import { javascript } from "@codemirror/lang-javascript";
import LanguageDisplayer from "Components/LanguageDisplayer";
import useUser from "hooks/useUser";

// const EXTENSIONS: { [key: string]: LanguageSupport[] } = {
//   markdown: [markdown()],
//   python: [python()],
//   javascript: [javascript()],
//   typescript: [javascript()],
//   cpp: [cpp()],
//   json: [json()],
//   java: [java()],
//   go: [go()],
//   html: [html()],
// };
const Container = styled.div`
  width: 100%;
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
const RunCode = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100px;
  font-size: 20px;
  border: 0;
  background-color: #2ecc71;
  color: white;
  border-radius: 30px;
  height: 35px;
  cursor: pointer;
`;

const CodeSectionWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const PlaceHolder = styled.div`
  background-color: var(--main-bg-cool-rgb);

  border-radius: 30px;
  height: 100%;
  width: 100%;

  position: relative;
  overflow: hidden;

  &: before {
    content: "";
    display: block;
    position: absolute;
    left: -200px;
    top: 0;
    height: 100%;
    width: 200px;
    background: linear-gradient(
      to right,
      transparent 0%,
      #8a8484 50%,
      transparent 100%
    );
    animation: load 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }

  @keyframes load {
    from {
      left: -150px;
    }
    to {
      left: 100%;
    }
  }
`;
const CodeSanBox = ({
  isLoading,
  setIsLoading,
  value,
  setValue,
  setResult,
  language,
  setCurrentTab,
  projectId,
}): JSX.Element => {
  const { user } = useUser();
  const codeSectionRef = useRef();
  const { dimensions: codeSection } = useResizeObserver(codeSectionRef);
  const theme = useEditorTheme();
  const onChange = React.useCallback((val, viewUpdate) => {
    setValue(val);
  }, []);
  const width = codeSection?.width ? `${codeSection?.width}px` : "0px";
  const height = codeSection?.height ? `${codeSection?.height}px` : "0px";

  const handleClick = async () => {
    if (language === apiGateway.HTML) {
      setIsLoading(true);

      const promiss = new Promise((resolve) => {
        setInterval(() => {
          resolve("ok");
        }, 500);
      });

      await promiss;
      setIsLoading(false);

      setResult({
        language,
        code: value,
      });
      return;
    }

    const numberOfFreeTry = localStorage.getItem("tryCount");
    const saveMetric = user.isProUser ? true : parseInt(numberOfFreeTry) <= 2;
    setIsLoading(true);

    const { result, errorMessage } = await apiGateway.runCode({
      userId: user.userId,
      language,
      code: value ?? "",
      saveMetric,
      projectId,
    });
    if (errorMessage) {
      window.alert(errorMessage);
    }

    setIsLoading(false);
    setResult(result);
    setCurrentTab("Output");
  };

  return (
    <Container>
      <CodoToolBar>
        <LanguageDisplayer language={language} />
        <RunCode
          style={{
            backgroundColor: isLoading ? "transparent" : "",
          }}
          onClick={handleClick}
        >
          {isLoading ? <PlaceHolder /> : "Run"}
        </RunCode>
      </CodoToolBar>
      <CodeSection>
        <CodeSectionWrapper ref={codeSectionRef}>
          {/* <CodeMirror
            value={value}
            height={height}
            width={width}
            theme={theme}
            extensions={[EXTENSIONS[language]]}
            onChange={onChange}
            className="outline-none"
            style={{
              fontSize: "16px",
              fontFamily: `Consolas', 'Menlo', 'Ubuntu Mono', 'Droid Sans Mono', monospace`,
            }}
          /> */}
        </CodeSectionWrapper>
      </CodeSection>
    </Container>
  );
};

export default CodeSanBox;
