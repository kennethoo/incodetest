import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useFetchAllUserKey from "hooks/useFetchAllUserKey";
import userWalletApi from "ApiServiveGateWay/userWalletApi";

// Styled components for UI
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  margin: 50px auto;
`;

const CreateButton = styled.button`
  padding: 5px 10px 5px; 10px;

  color: white;
  background-color: #6f56e5;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s ease;
   margin-top:10px;

`;

const KeyList = styled.div`
  margin-top: 20px;
  width: 100%;
  color: var(--text);
`;

const KeyItem = styled.div`
  background-color: var(--main-bg-box);
  padding: 10px;
  margin-bottom: 8px;
  border-radius: 5px;
  word-break: break-all;
`;

const KeyText = styled.p`
  font-size: 16px;
  color: var(--text);
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
`;
const CreateKeySection = styled.div`
  background-color: var(--main-bg-box);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  color: var(--text);
`;

const CreateApiKeyComponent = () => {
  const [apiKeys, setApiKeys] = useState([]);
  const { userKeys: fetchKeys } = useFetchAllUserKey();

  // Load previous keys from localStorage on mount
  useEffect(() => {
    setApiKeys(fetchKeys);
  }, [fetchKeys]);

  const handleCreateApiKey = async () => {
    const { result } = await userWalletApi.createKey();
    setApiKeys((prevKeys) => [...prevKeys, result]);
  };

  return (
    <Container>
      <CreateKeySection>
        <h2>Create a New API Key</h2>
        <p>Generate a new API key to integrate with our services.</p>
        <CreateButton onClick={handleCreateApiKey}>Create API Key</CreateButton>
      </CreateKeySection>

      {/* API Keys List */}
      <KeyList>
        <h2>Active API Keys</h2>
        {apiKeys.map((key) => (
          <KeyItem key={key.id}>
            <KeyText>{key.apiKey}</KeyText>
          </KeyItem>
        ))}
      </KeyList>
    </Container>
  );
};

export default CreateApiKeyComponent;
