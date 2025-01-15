import { useState } from "react";
import styled from "styled-components";
import BackButton from "Components/shared/BackButton";
import ProjectCard from "Components/project/ProjectCard";
import { useProjects } from "hooks/useProjects";
import DropDownMenu from "Components/shared/DropDownMenu";
import { apiGateway } from "ApiServiveGateWay/apiGateway";
import useUser from "hooks/useUser";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import NoProjectEmptyState from "Components/project/NoProjectEmptyState";
import { useRecentProject } from "hooks/project/useRecentProject";
import { projectApi } from "ApiServiveGateWay/ProjectApi";
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  overflow: scroll;
`;

const Header = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  color: var(--text);
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid var(--main-bg-cool-rgb);
  justify-content: space-between;
`;

const Title = styled.p`
  font-size: 20px;
  color: var(--text);
`;

const ProjectsContainer = styled.div`
  width: 100%;
  margin: 0 auto;

  border-radius: 20px;

  padding-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  padding-bottom: 10px;
  max-height: 100%;
  grid-gap: 30px;
  overflow: scroll;
`;

const Wraper = styled.div`
  display: flex;
  align-items: center;
`;
function Projects() {
  const { user } = useUser();
  const { addRecent } = useRecentProject();
  const navigate = useNavigate();
  const { projectsResult, isLoading } = useProjects({
    action: projectApi.GET_ALL_PROJECT_BY_USERID,
    payload: {
      userId: user.userId,
    },
  });
  const handleCreateProject = async (language) => {
    const { projects } = projectsResult;
    const { succeeded, project } = await projectApi.create({
      action: apiGateway.CREATE_NEW_PROJECT,
      payload: {
        language,
        title: `Project #${projects.length + 1}`,
        userId: user.userId,
      },
    });

    if (succeeded) {
      addRecent([project]);
      navigate(`/app/project/${project._id}/0`);
    } else {
      console.log("logg it ");
    }
  };

  const renderData = () => {
    if (isLoading) {
      return null;
    }

    if (!projectsResult.projects.length) {
      return <NoProjectEmptyState />;
    } else {
      return (
        <ProjectsContainer>
          {projectsResult.projects
            .sort((a, b) => {
              if (
                moment.utc(a.lastModified).isBefore(moment.utc(b.lastModified))
              ) {
                return 1;
              } else {
                return -1;
              }
            })
            .map((project) => {
              return <ProjectCard key={project._id} project={project} />;
            })}
        </ProjectsContainer>
      );
    }
  };
  return (
    <Container>
      <Header>
        <Wraper>
          <BackButton />
          <Title>Projects</Title>
        </Wraper>

        <DropDownMenu
          options={[
            {
              item: "Javascript",
              handleClick: () => {
                handleCreateProject(apiGateway.JAVASCRIPT);
              },
            },
            {
              item: "Python",
              handleClick: () => {
                handleCreateProject(apiGateway.PYTHON);
              },
            },
            {
              item: "Java",
              handleClick: () => {
                handleCreateProject(apiGateway.JAVA);
              },
            },
            {
              item: "Go",
              handleClick: () => {
                handleCreateProject(apiGateway.GO);
              },
            },
            {
              item: "Html",
              handleClick: () => {
                handleCreateProject(apiGateway.HTML);
              },
            },
          ]}
        />
      </Header>
      {renderData()}
    </Container>
  );
}

export default Projects;
