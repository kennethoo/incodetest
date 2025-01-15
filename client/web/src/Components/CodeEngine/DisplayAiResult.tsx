import React, { useRef, useState } from "react";
import styled from "styled-components";

import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

const Container = styled.div`
  width: 100%;

  overflow: scroll;
  display: block;
  flex-direction: column;
`;

const MainSection = styled.div`
  width: 100%;
  display: inline-block;
  justify-content: center;
  color: var(--text);
  overflow: scroll;
`;

const DisplayAiResult = ({ result }): JSX.Element => {
  return (
    <Container>
      <MainSection>
        <ReactMarkdown
          children={result}
          components={{
            code({ node, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, "")}
                  style={materialDark}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        />
      </MainSection>
    </Container>
  );
};

export default DisplayAiResult;
