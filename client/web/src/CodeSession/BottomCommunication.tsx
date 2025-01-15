import React from "react";
import styled from "styled-components";
import SyncAudioRoom from "Components/syncAudioRoomV3/SyncAudioRoom";
const Container = styled.div`
  width: 100%;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--main-bg-cool-rgb);
`;

const SectionOption = styled.div`
  display: flex;
  justify-content: space-between;
  height: 40px;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
`;
const SectionTitle = styled.div`
  font-weight: bold;
  color: var(--text);
`;
const BottomCommunication = ({ id }): JSX.Element => {
  return (
    <Container>
      <SectionOption>
        <SectionTitle>Audio</SectionTitle>
        <SyncAudioRoom goback={() => {}} roomId={id} />
      </SectionOption>
    </Container>
  );
};

export default BottomCommunication;
