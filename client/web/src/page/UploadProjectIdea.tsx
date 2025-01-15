import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import styled from "styled-components";
import ActionButton from "Components/shared/ActionButton";
import { apiGateway } from "ApiServiveGateWay/apiGateway";
import useLogger from "hooks/useLogger";
import validateFileName from "utility/validateFileName";
import Editable from "Components/shared/Editable";
import TopNavigation from "landing/TopNavigation";
import useUser from "hooks/useUser";
import TagProjectWithCompatibleLanguage from "Components/shared/TagProjectWithCompatibleLanguage";
const Container = styled.div`
  width: 100%;
  height: 100vh;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
`;
const Title = styled.p`
  color: #dadada;
  letter-spacing: 1px;
`;

const FormContainer = styled.div`
  border: 1px solid var(--main-bg-cool-rgb);
  width: 500px;
  margin-top: 20px;
  padding: 10px;
  border-radius: 5px;
`;

const InputContainer = styled.div`
  border: 1px solid var(--main-bg-cool-rgb);
  border-radius: 10px;
  margin-top: 10px;
  & input {
    background: none;
    border: 0;
    outline: none;
    font-size: 18px;
    letter-spacing: 1px;
    color: var(--text);
    padding: 10px;
    width: 100%;
  }
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

const AddProject = styled.button`
  padding: 5px 10px 5px; 10px;
  width:100%;
  color: white;
  background-color: #6f56e5;
  border: 0;
  border-radius: 30px;
  cursor: pointer;
  margin-top:10px;
  height:40px;
  font-size:18px
`;
const techList = [
  apiGateway.JAVASCRIPT,
  apiGateway.JAVA,
  apiGateway.GO,
  apiGateway.PYTHON,
];

function UploadProjectIdea() {
  const [projectIdea, setProjectIdea] = useState<any>({ difficulty: "easy" });
  const [tags, setTags] = useState<any>(techList);
  const { user } = useUser();
  const handleClick = async () => {
    const projectIdeaPlayload = {
      creatorId: user.userId,
      ...projectIdea,
      languages: tags,
    };

    const result = await apiGateway.handleActionForRepository({
      action: apiGateway.CREATE_NEW_PROJECT_IDEA,
      payload: {
        ...projectIdeaPlayload,
      },
    });
  };
  return (
    <Container>
      <TopNavigation />
      <FormContainer>
        <Header>Project Idea</Header>
        <InputContainer>
          <input
            onChange={(e) =>
              setProjectIdea({ ...projectIdea, title: e.target.value })
            }
            type="text"
            placeholder="Add title"
            value={projectIdea.title}
          />
        </InputContainer>
        <InputContainer>
          <input
            onChange={(e) =>
              setProjectIdea({ ...projectIdea, difficulty: e.target.value })
            }
            type="text"
            placeholder="Add difficulty"
            value={projectIdea.difficulty}
          />
        </InputContainer>
        <InputContainer style={{ padding: "10px 10px 0px 10px" }}>
          <Editable
            placeholder="Short Desctiption"
            handleBio={(item) => {
              setProjectIdea({
                ...projectIdea,
                shortDescription: item,
              });
            }}
            value={projectIdea.shortDescription}
          />
        </InputContainer>

        <InputContainer style={{ padding: "10px 10px 0px 10px" }}>
          <Editable
            placeholder="Long Description"
            handleBio={(item) => {
              setProjectIdea({
                ...projectIdea,
                description: item,
              });
            }}
            value={projectIdea.description}
          />
        </InputContainer>
        <TagProjectWithCompatibleLanguage setTag={setTags} tags={tags} />
        <AddProject onClick={handleClick}>Add Project</AddProject>
      </FormContainer>
    </Container>
  );
}

export default UploadProjectIdea;
