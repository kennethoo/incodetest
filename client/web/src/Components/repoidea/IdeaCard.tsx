import React, { useState } from "react";
import styled from "styled-components";
import DificultyTag from "Components/repoidea/DificultyTag";
import { apiGateway } from "ApiServiveGateWay/apiGateway";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { IoCloseSharp } from "react-icons/io5";
import LoadingSpin from "Components/Loadingspin";
import useUser from "hooks/useUser";
import PreviewCode from "Components/project/PreviewCode";

const Card = styled(motion.div)`
  width: 100%;
  display: block;
  height: 230px;
  align-items: center;
  flex-direction: column;
  padding-bottom: 10px;
  cursor: pointer;
  min-width: 250px;
  max-width: 500px;
  padding: 5px;
  flex-direction: column;
  border-radius: 10px;
  background: var(--main-bg-cool-rgb);
  transition: all 0.2s ease;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    background-color: var(--main-bg-box);
    border: 0;
  }
`;
const OptionCard = styled(motion.div)`
  width: 100%;
  display: block;
  overflow: scroll;
  height: 230px;

  align-items: center;
  flex-direction: column;
  padding-bottom: 10px;
  cursor: pointer;
  min-width: 250px;
  max-width: 500px;
  padding: 5px;
  flex-direction: column;
  border-radius: 10px;
  font-size: 18px;
  background: var(--main-bg-cool-rgb);
  font-size: 18px;
  &:hover {
    background-color: var(--main-bg-box);
    border: 0;
  }
`;

const Title = styled.p`
  font-size: 20px;
  color: var(--text);
  display: flex;

  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: capitalize;
  margin-top: 5px;
  font-weight: bolder;
  padding-left: 10px;
`;

const Description = styled.p`
  font-size: 16px;
  color: #d1d5db;
  overflow: hidden;
  padding-left: 10px;
  height: 50px;
  overflow: scroll;
  display: flex;
  align-items: center;
`;

const IconRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
`;

const ListofLanguageContainer = styled.div``;

const LanguageContainer = styled.div`
  padding: 10px;
  color: var(--text);
  margin: 5px;

  border-radius: 10px;

  &:hover {
    background-color: var(--main-bg-cool-rgb);
  }
`;

const Header = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  color: var(--text);
`;
const BackButton = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 40px;
  min-width: 40px;
  max-width: 40px;
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

function IdeaCard({ project }) {
  const [expanded, setExpanded] = useState(false);
  if (expanded) {
    return <PickProjectIdea setExpanded={setExpanded} project={project} />;
  }
  return <ProjectIdeaDesctiption setExpanded={setExpanded} project={project} />;
}

function ProjectIdeaDesctiption({ project, setExpanded }) {
  return (
    <Card
      whileHover={{ scale: 1.04 }}
      transition={{ type: "spring", stiffness: 1000 }}
      onClick={() => setExpanded(true)}
      layout={true}
    >
      <PreviewCode
        projectId=""
        extension={"markdown"}
        filename="test"
        code={project.description}
      />
      <DificultyTag level={project.difficulty} />
      <Title>{project.title}</Title>
      <Description>{project.shortDescription}</Description>
    </Card>
  );
}

function PickProjectIdea({ setExpanded, project }) {
  const { user } = useUser();
  const [isLoading, setIdLoading] = useState(false);
  const navigate = useNavigate();

  const handleSletect = async (language) => {
    if (isLoading) {
      return;
    }
    setIdLoading(true);

    const { result } = await apiGateway.handleActionForRepository({
      action: apiGateway.CLONE_PROJECT_IDEA,
      payload: {
        projectId: project._id,
        userId: user.userId,
        language: language.toLowerCase(),
      },
    });
    navigate(`/app/project/${result._id}/0`);
  };

  return (
    <OptionCard>
      <Header>
        {isLoading ? (
          <LoadingSpin />
        ) : (
          <BackButton
            onClick={() => {
              setExpanded(false);
            }}
          >
            <IoCloseSharp />
          </BackButton>
        )}
        Select a language
      </Header>
      <ListofLanguageContainer>
        {project.languages.map((item) => {
          return (
            <LanguageContainer
              onClick={() => {
                handleSletect(item);
              }}
            >
              {item}
            </LanguageContainer>
          );
        })}
      </ListofLanguageContainer>
    </OptionCard>
  );
}

export default IdeaCard;
