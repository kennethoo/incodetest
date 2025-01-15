import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import DropDownOptions from "Components/shared/DropDownOptions";
import { apiGateway } from "ApiServiveGateWay/apiGateway";
import Codeboard from "ApiServiveGateWay/Codeboard";

import useUser from "hooks/useUser";

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
  height: 40px;
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
  height: 30px;
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
const LANGUAGE_TO_EXTENSION = {
  javascript: "js",
  typescript: "ts",
  python: "py",
  ruby: "rb",
  php: "php",
  java: "java",
  cpp: "cpp",
  csharp: "cs",
  html: "html",
  css: "css",
  xml: "xml",
  json: "json",
  go: "go",
  rust: "rs",
  kotlin: "kt",
  swift: "swift",
  scala: "scala",
  sql: "sql",
  r: "r",
  markdown: "md",
  bash: "sh",
  powershell: "ps1",
  yaml: "yaml",
  toml: "toml",
  ini: "ini",
  dart: "dart",
};

const DropdowContainer = styled.div`
  width: 100%;
  max-width: 175px;
`;
const GuestCodeSanBox = ({
  isLoading,
  setIsLoading,
  setLanguage,
  setResult,
  setCurrentTab,
  setCode,
  code,
}): JSX.Element => {
  const [currentLanguage, setCurrentLanguage] = useState(apiGateway.PYTHON);
  const { user } = useUser();
  const codeSectionRef = useRef();
  const codebaord = useRef(null);
  const handleClick = async () => {
    if (currentLanguage === apiGateway.HTML) {
      setIsLoading(true);

      const promiss = new Promise((resolve) => {
        setInterval(() => {
          resolve("ok");
        }, 500);
      });

      await promiss;
      setIsLoading(false);
      setResult({
        language: currentLanguage,
        code,
      });
      return;
    }

    setIsLoading(true);
    const { result, errorMessage } = await apiGateway.runCode({
      userId: user.userId,
      language: currentLanguage,
      code: code ?? "",
      saveMetric: false,
      projectId: null,
    });
    if (errorMessage) {
      window.alert(errorMessage);
    }

    setIsLoading(false);
    setResult(result);
    setCurrentTab("Output");
  };

  useEffect(() => {
    const extension = LANGUAGE_TO_EXTENSION[currentLanguage];
    codebaord.current = new Codeboard({
      instance: "codemirror",
      username: "",
      ref: codeSectionRef.current,
      extension,
      projectId: "",
      filename: "",
      userId: "",
    });
    codebaord.current.setupBasicCodeboard();
    codebaord.current.ydoc.on("update", (update) => {
      setCode(codebaord.current.yText.toString());
    });
    return () => {
      codebaord.current.destroy();
      setCode("");
    };
  }, [currentLanguage]);

  return (
    <Container>
      <CodoToolBar>
        <DropdowContainer>
          <DropDownOptions
            canEdit={true}
            setSelectedOption={(item) => {
              setCurrentLanguage(item);
              setLanguage(item);
            }}
            selectedLanguage={currentLanguage}
            options={[apiGateway.JAVASCRIPT, apiGateway.PYTHON, apiGateway.GO]}
          />
        </DropdowContainer>

        <RunCode
          style={{
            backgroundColor: isLoading ? "transparent" : "",
          }}
          onClick={handleClick}>
          {isLoading ? <PlaceHolder /> : "Run"}
        </RunCode>
      </CodoToolBar>
      <CodeSection>
        <CodeSectionWrapper ref={codeSectionRef} />
      </CodeSection>
    </Container>
  );
};

export default GuestCodeSanBox;
