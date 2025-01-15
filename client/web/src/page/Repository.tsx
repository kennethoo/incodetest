import { useState } from "react";
import styled from "styled-components";
import BackButton from "Components/shared/BackButton";
import ProjectCard from "Components/project/ProjectCard";
import DropDownMenu from "Components/shared/DropDownMenu";
import { apiGateway } from "ApiServiveGateWay/apiGateway";
import useUser from "hooks/useUser";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import NoProjectEmptyState from "Components/project/NoProjectEmptyState";
import idea from "testdata/idea";
import IdeaCard from "Components/repoidea/IdeaCard";
import { useRepository } from "hooks/useRepository";
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
function Repository() {
  const navigate = useNavigate();
  const { projects, isLoading } = useRepository();

  const renderData = () => {
    if (isLoading) {
      return null;
    }

    if (!projects.length) {
      return <NoProjectEmptyState />;
    } else {
      return (
        <ProjectsContainer>
          {projects.reverse()?.map((project) => {
            return <IdeaCard key={project._id} project={project} />;
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
          <Title>Projects Ideas</Title>
        </Wraper>
      </Header>
      {renderData()}
    </Container>
  );
}

export default Repository;
