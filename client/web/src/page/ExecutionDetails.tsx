// ExecutionDetail.js
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BackButton from "Components/shared/BackButton";
import { useAnalitic } from "hooks/useAnalitic";
import { useParams } from "react-router-dom";
import LanguageDisplayer from "Components/LanguageDisplayer";
import moment from "moment";
import { calendarDisplayFormat } from "utility/momentFormat";

// Styled Components
const Container = styled.div`
  max-width: 100%:
  margin: 0 auto;

  font-family: Arial, sans-serif;

  color: var(--text);

`;

const Header = styled.div`
  display: flex;

  align-items: center;
  background-color: var(--main-bg-pagebox);
  height: 50px;
  border-bottom: 1px solid var(--main-bg-cool-rgb);
  margin-bottom: 20px;
`;

const Summary = styled.div`
  border-radius: 8px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  border: 1px solid var(--main-bg-cool-rgb);
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const SummaryItem = styled.div`
  display: flex;
  flex-direction: column;
  text-transform: capitalize;
  & strong {
    margin-bottom: 10px;
  }

  & span {
    text-transform: capitalize;
  }
`;

const Section = styled.div`
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid var(--main-bg-cool-rgb);
`;

const CodeBlock = styled.pre`
  background-color: var(--main-bg-box);
  padding: 10px;
  border-radius: 8px;
  max-height: 500px;
  overflow-x: auto;
  font-family: "Courier New", Courier, monospace;
  white-space: pre-wrap;
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 30px;
  cursor: pointer;
  margin: 10px;
`;

const Actions = styled.div`
  text-align: center;
`;

const ExecutionTime = styled.div`
  display: flex;
  padding-right: 10px;

  & p {
    margin-right: 5px;
  }
`;

const DetailsWrapper = styled.div`
  width: 95%;
  margin: 0 auto;
  max-width: 1200px;
`;

const ExecutionDetail = () => {
  const { id } = useParams();
  const { logs, isLoading } = useAnalitic({ _id: id });

  const [log, setLog] = useState(null);

  useEffect(() => {
    if (!isLoading) {
      setLog(logs[0]);
    }
  }, [isLoading]);

  return (
    <Container>
      {log && (
        <>
          <Header>
            <BackButton />
            <ExecutionTime>
              <p>Execution Date:</p>
              {moment(log.starTime).local().format(calendarDisplayFormat)}
            </ExecutionTime>
          </Header>
          <DetailsWrapper>
            <Summary>
              <SummaryItem>
                <strong>Language:</strong>
                <LanguageDisplayer language={log.language} />
              </SummaryItem>
              <SummaryItem>
                <strong>Status:</strong>
                <span
                  style={{
                    color:
                      log.runTimeStatus === "succeeded" ? "#4caf50" : "red",
                  }}
                >
                  {log.runTimeStatus}
                </span>
              </SummaryItem>
              <SummaryItem>
                <strong>Duration:</strong>
                <span>{log.duration.toFixed(2)}s</span>
              </SummaryItem>
              <SummaryItem>
                <strong>Memory Usage:</strong>
                <span>{log.memoryUsage}</span>
              </SummaryItem>
              <SummaryItem>
                <strong>CPU Time:</strong>
                <span>{log.cpuUsage}</span>
              </SummaryItem>
            </Summary>
            {/* <Section>
              <h2>Code Executed</h2>

              <CodeBlock>{log.code}</CodeBlock>
            </Section> */}
            <Section>
              <h2>Output</h2>
              <CodeBlock>{log.output}</CodeBlock>
            </Section>
            <Section>
              <h2>Error Details</h2>
              <CodeBlock>{log.errorMessage}</CodeBlock>
            </Section>

            {/* <Actions>
              <Button>Download Logs</Button>
            </Actions> */}
          </DetailsWrapper>
        </>
      )}
    </Container>
  );
};

export default ExecutionDetail;
