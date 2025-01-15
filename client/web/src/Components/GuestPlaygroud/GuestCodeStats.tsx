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
  width: 100%;
  padding: 10px;
  color: var(--text);
`;

const Summary = styled.div`
  border-radius: 8px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  border: 1px solid var(--main-bg-cool-rgb);
  margin-bottom: 20px;
  flex-direction: column;

  width: 100%;
`;

const SummaryItem = styled.div`
  display: flex;
  border-bottom: 1px solid var(--main-bg-cool-rgb);
  flex-direction: column;
  text-transform: capitalize;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  & strong {
    margin-bottom: 5px;
  }

  & span {
    text-transform: capitalize;
  }
`;

const DetailsWrapper = styled.div`
  width: 95%;
  margin: 0 auto;
  max-width: 1200px;
`;

const GuestCodeStats = ({ log }) => {
  return (
    <Container>
      {log && (
        <>
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
                <span>{log.duration?.toFixed(2)}s</span>
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
          </DetailsWrapper>
        </>
      )}
    </Container>
  );
};

export default GuestCodeStats;
