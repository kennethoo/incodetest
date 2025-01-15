import React, { useRef, useState } from "react";
import useResizeObserver from "hooks/layout/useResizeObserver";
import styled from "styled-components";
import LoadingSpin from "Components/Loadingspin";
import Tabs from "Components/shared/Tabs";
import RenderHtml from "Components/CodeEngine/RenderHtml";
import { apiGateway } from "ApiServiveGateWay/apiGateway";

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: scroll;
  display: block;
  flex-direction: column;
`;

const MainSection = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 100%;
  display: inline-block;
  justify-content: center;
  padding: 10px;

  overflow: scroll;
`;
const Header = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 50px;
  display: flex;
  align-items: center;
  color: var(--text);
  padding-left: 20px;
  border-bottom: 1px solid var(--main-bg-cool-rgb);
`;

const Text = styled.p`
  width: 100%;
  margin: 0 auto;
  white-space: pre-wrap;
  font-family: arial;
`;

const PlaceHolder = styled.div`
  background-color: var(--main-bg-cool-rgb);
  margin-bottom: 10px;
  border-radius: 30px;
  height: 50px;
  width: 100%;

  position: relative;
  overflow: hidden;
  animation: showIt 0.4s cubic-bezier(0.4, 0, 0.2, 1);

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

    animation-delay: 1s;
    animation: load 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }

  @keyframes load {
    from {
      opacity: 0;
      left: -150px;
    }
    to {
      opacity: 1;
      left: 100%;
    }
  }

  @keyframes showIt {
    0% {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const LoadingContainer = styled.div`
  width: 100%;
`;
const CodeBlock = styled.pre`
  background-color: var(--main-bg-box-item);
  padding: 10px;
  border-radius: 8px;
  font-weight: 400;
  overflow-x: auto;
  font-family: arial;
  white-space: pre-wrap;
  color: var(--text);
  font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
  margin-bottom: 10px;
`;
const Outputs = ({ result, isLoading }): JSX.Element => {
  const hasErrorMessage = result.errorMessage ? true : false;

  const style = hasErrorMessage
    ? {
        backgroundColor: "rgba(224, 17, 95, 0.1)",
        color: "#E0115F",
      }
    : { backgroundColor: "var(--main-bg-box-item)", color: "var(--text" };
  const { language } = result;
  return (
    <Container>
      <MainSection>
        {isLoading && (
          <LoadingContainer>
            <PlaceHolder />
            <PlaceHolder />
            <PlaceHolder />
          </LoadingContainer>
        )}

        {language === apiGateway.HTML ? (
          <RenderHtml result={result} />
        ) : (
          <>
            {!isLoading && result.errorMessage && (
              <CodeBlock style={style}>{result.errorMessage}</CodeBlock>
            )}
            {!isLoading && result.output && (
              <CodeBlock>{result.output}</CodeBlock>
            )}
          </>
        )}
      </MainSection>
    </Container>
  );
};

export default Outputs;
