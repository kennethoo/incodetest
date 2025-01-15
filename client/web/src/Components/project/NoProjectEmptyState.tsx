import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
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

// Styled component for a button (optional)
const CreateButton = styled(Link)`
  padding: 10px 20px;
  background-color: #6f56e5;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-size: 16px;
`;

const NoProjectEmptyState = () => {
  return (
    <EmptyStateContainer>
      <Message>No Projects</Message>
      <Description>Start your first one now by cliking the menu</Description>
    </EmptyStateContainer>
  );
};

export default NoProjectEmptyState;
