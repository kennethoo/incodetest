import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSharedProjects } from "hooks/useSharedProjects";
import BackButton from "Components/shared/BackButton";
import EditProject from "Components/project/EditProject";
import DeleteProject from "Components/project/DeleteProject";
import DropDownMenu from "Components/shared/DropDownMenu";
import { apiGateway } from "ApiServiveGateWay/apiGateway";
import { useNavigate } from "react-router-dom";
import SharedPlayground from "Components/sharedProject/SharedPlayground";
import SharedSideProjectNavigation from "Components/sharedProject/SharedSideProjectNavigation";
import TopNavigation from "landing/TopNavigation";
import { useParams } from "react-router-dom";
const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 100vh;
  height: 100dvh;
  display: flex;
  flex-direction: column;
`;

const PlaygroundContainer = styled.div`
  height: 100%;
  width: calc(100% - 200px);
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

const AppWrapper = styled.div`
  height: calc(100% - 70px);
  width: 100%;

  display: flex;
  border-top: 1px solid var(--main-bg-cool-rgb);
`;
const SharedProjectPlayGround = (): JSX.Element => {
  const { projectId } = useParams();

  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const { projects } = useSharedProjects({ _id: projectId });
  const [files, setFiles] = useState(project?.projectFiles ?? []);
  const { tab } = useParams();
  useEffect(() => {
    if (projects.length) {
      setProject(projects[0]);
      setFiles(projects[0].projectFiles);
      const defaultFile = projects[0].projectFiles.findIndex(
        (file) => file.isEntryPoint,
      );

      if (tab === undefined) {
        navigate(`/shared/${projects[0]._id}/${defaultFile}`);
      }
    }
  }, [projects]);

  return (
    <Container>
      <TopNavigation />
      <AppWrapper>
        <SharedSideProjectNavigation project={project} />

        <PlaygroundContainer>
          {project && (
            <SharedPlayground
              files={files}
              project={project}
              setFiles={setFiles}
              language={project.language}
            />
          )}
        </PlaygroundContainer>
      </AppWrapper>
    </Container>
  );
};

export default SharedProjectPlayGround;
