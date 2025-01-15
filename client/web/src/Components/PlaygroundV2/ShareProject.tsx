import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import { apiGateway } from "ApiServiveGateWay/apiGateway";
import { useNavigate } from "react-router-dom";
import useUser from "hooks/useUser";
import ExtensionDisplayer from "Components/shared/ExtensionDisplayer";
import DeleteFileButton from "Components/PlaygroundV2/DeleteFileButton";
import Toggle from "Components/shared/Toggle";
import useLogger from "hooks/useLogger";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  padding-rigth: 10px;
  border-bottom: 1px solid var(--main-bg-cool-rgb);
  justify-content: space-between;
`;

const EditButton = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 40px;
  width: 40px;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: var(--text);
  background-color: transparent;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  margin-left: 5px;
  margin-right: 5px;
  &:hover {
    background-color: var(--main-bg-cool-rgb);
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  color: var(--text);
  width: calc(100% - 65px);
`;

const FileContainer = styled.div`
  height: 35px;
  color: var(--text);
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: var(--main-bg-cool-rgb);
    & .delete-file {
      display: flex;
    }
  }
`;

const ShareProject = ({ project }): JSX.Element => {
  const [isProjectPublic, setIsPublic] = useState(project?.isPublic);
  const logger = useLogger();
  const sharedProject = async () => {
    const payload = {
      projectId: project._id,
      isPublic: !isProjectPublic,
    };
    await apiGateway.handleActionForProject({
      action: apiGateway.UPDATE_PROJECT_TO_PUBLIC,
      payload,
    });
    setIsPublic(!isProjectPublic);
    logger({
      isErrorMessage: false,
      message: "Your project is now accessible from anyone",
      fileName: "ShareProject.tex",
    });
  };

  return (
    <Container>
      <Toggle
        setToggle={(value) => {
          sharedProject();
        }}
        value={isProjectPublic}
      />
    </Container>
  );
};

export default ShareProject;
