import React, { useState, useEffect, useRef } from "react";

import styled from "styled-components";
import Tabs from "Components/shared/Tabs";

const Container = styled.div`
  height: 100%;
  width: 100%;
  border: 1px solid var(--main-bg-cool-rgb);
  border-radius: 10px;
  overflow: hidden;
`;

const WorkAreaV3 = ({
  videoScreenStream,
  isParticipantAndChatOpen,
  uniqueUserSessionId,
  shouldScreenBevisable,
  listOfUsersWithScreenShareOne,
  roomId,
}) => {
  return (
    <Container>
      <Tabs
        labelStyle={{ marginTop: "1px" }}
        tabsLabelsStyle={{
          height: "40px",
          marginBottom: "0px",
          paddingLeft: "5px",
          paddingRight: "5px",
          borderBottom: "1px solid var(--main-bg-cool-rgb)",
          borderRadius: "0px",
        }}
        sections={[]}
      />
    </Container>
  );
};

export default WorkAreaV3;
