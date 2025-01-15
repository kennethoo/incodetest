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

const NoSessionEmptyState = () => {
  const { user } = useUser();
  const messsage = user.isProUser
    ? "Create a code session and share the link with anyone"
    : "Create a code session and share the link with up to 3 people for 24H ";
  return (
    <EmptyStateContainer>
      <Message>No Session</Message>
      <Description>{messsage}</Description>
    </EmptyStateContainer>
  );
};

export default NoSessionEmptyState;
