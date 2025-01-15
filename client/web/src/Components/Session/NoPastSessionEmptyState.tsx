import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import useUser from "hooks/useUser";
// Styled component for the container
const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  color: var(--text);
  padding: 20px;
`;

// Styled component for the message
const Message = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

// Styled component for additional description
const Description = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
  color: var(--text);
`;

const NoPastSessionEmptyState = () => {
  return (
    <EmptyStateContainer>
      <Message>No Past Session</Message>
      <Description>
        Update to INCODE PRO to save your all your sessions
      </Description>
    </EmptyStateContainer>
  );
};

export default NoPastSessionEmptyState;
