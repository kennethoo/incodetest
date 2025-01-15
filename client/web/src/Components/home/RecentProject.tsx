import { useState } from "react";
import styled from "styled-components";
import ProjectCard from "Components/project/ProjectCard";
import { useProjects } from "hooks/useProjects";
import moment from "moment";
import NoProjectEmptyState from "Components/home/NoProjectEmptyState";
import useUser from "hooks/useUser";
import { useRecentProject } from "hooks/project/useRecentProject";

const Container = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  overflow: scroll;
`;

const Header = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  color: var(--text);
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
  justify-content: space-between;
  padding-left: 10px;
`;

const Title = styled.p`
  font-size: 20px;
`;

const ProjectsContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  border-radius: 20px;
  padding-top: 10px;
  padding-right: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  padding-bottom: 10px;
  max-height: 100%;
  grid-gap: 10px;
  overflow: scroll;
`;

const Wraper = styled.div`
  display: flex;
  align-items: center;
`;
function RecentProject() {
  const { user } = useUser();
  const { recentProject, isLoading } = useRecentProject();
  const getRecentProject = () => {
    recentProject.sort((a, b) => {
      if (moment.utc(a.lastModified).isBefore(moment.utc(b.lastModified))) {
        return 1;
      } else {
        return -1;
      }
    });

    return recentProject.slice(0, 3);
  };

  const renderData = () => {
    if (isLoading) {
      return null;
    }
    if (!recentProject.length) {
      return <NoProjectEmptyState />;
    } else {
      return (
        <ProjectsContainer>
          {getRecentProject().map((project) => {
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
          <Title>Recent Projects</Title>
        </Wraper>
      </Header>
      {renderData()}
    </Container>
  );
}

export default RecentProject;
