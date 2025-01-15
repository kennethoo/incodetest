import { useState } from "react";
import styled from "styled-components";
import CreateApiKeyComponent from "Components/CreateApiKeyComponent";
import BackButton from "Components/shared/BackButton";
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  color: var(--text);
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid var(--main-bg-cool-rgb);
`;

function ApiKeys() {
  return (
    <Container>
      <Header>
        <BackButton />
        Api Keys
      </Header>
      <CreateApiKeyComponent />
    </Container>
  );
}

export default ApiKeys;
