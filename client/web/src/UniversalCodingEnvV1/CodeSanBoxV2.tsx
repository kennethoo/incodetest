import React, { useEffect, useRef, useState } from "react";

import styled from "styled-components";
import { useParams } from "react-router-dom";

import { apiGateway } from "ApiServiveGateWay/apiGateway";

import useUser from "hooks/useUser";
import FileTabs from "UniversalCodingEnvV1/FileTabs";
import { FaPlay } from "react-icons/fa";

const RunCode = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 40px;
  font-size: 18px;
  border: 0;
  background-color: #2ecc71;
  color: white;
  border-radius: 30px;
  height: 40px;
  cursor: pointer;
  position: absolute;
  bottom: 50px;
  z-index: 1;
  right: 10px;
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
  height: 100%;
`;

const CodeSectionWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const CodeSanBoxV2 = ({
  isLoading,
  setIsLoading,
  setResult,
  setCurrentTab,
  setFiles,
  files,
  updateProjectProfile,
  canUpdate,
  setOuputSectionOpen,
  baseTabLink,
  codeWorkSessionApiRef,
  language,
  isReadOnly,
}): JSX.Element => {
  const { user } = useUser();
  const codeSectionRef = useRef();

  const codeWorkSession = codeWorkSessionApiRef.codeWorkSession;
  const { _id } = codeWorkSession;

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
        files,
      });
      setOuputSectionOpen(true);
      return;
    }

    const numberOfFreeTry = localStorage.getItem("tryCount");
    const saveMetric = user?.isProUser ? true : parseInt(numberOfFreeTry) <= 2;
    setIsLoading(true);

    const { result, errorMessage } = await apiGateway.runCodev2({
      userId: user?.userId,
      language,
      files,
      saveMetric,
      projectId: null,
    });
    if (errorMessage) {
      window.alert(errorMessage);
    }
    setIsLoading(false);
    setResult(result);
    setCurrentTab("Output");
    setOuputSectionOpen(true);
  };

  return (
    <Container>
      <RunCode
        style={{
          backgroundColor: isLoading ? "transparent" : "",
        }}
        onClick={handleClick}
      >
        {isLoading ? <PlaceHolder /> : <FaPlay />}
      </RunCode>
      <CodeSection>
        <CodeSectionWrapper ref={codeSectionRef}>
          <FileTabs
            isReadOnly={isReadOnly}
            codeWorkSessionApiRef={codeWorkSessionApiRef}
            baseTabLink={baseTabLink}
            canUpdate={canUpdate}
            updateProjectProfile={updateProjectProfile}
            sections={files}
            language={language}
            codeWorkSessionId={_id}
          />
        </CodeSectionWrapper>
      </CodeSection>
    </Container>
  );
};

export default CodeSanBoxV2;
