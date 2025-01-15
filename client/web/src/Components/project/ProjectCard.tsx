import styled from "styled-components";
import LanguageDisplayer from "Components/LanguageDisplayer";
import { useNavigate } from "react-router-dom";
import PreviewCode from "Components/project/PreviewCode";
import moment from "moment";
import { calendarDisplayFormat } from "utility/momentFormat";
// no display the code preview
//
const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 10px;
  cursor: pointer;
  min-width: 250px;
  max-width: 500px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background: var(--main-bg-cool-rgb);
  font-size: 18px;
  &:hover {
    background-color: var(--main-bg-box);
    border: 0;
  }
`;

const ContainerDetails = styled.div`
  display: block;
  width: 100%;
  margin-top: 10px;
`;
const Title = styled.p`
  font-size: 18px;
  color: var(--text);
  display: flex;

  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: capitalize;
  margin-top: 5px;
  font-weight: bolder;
  padding-left: 10px;
`;
const Date = styled.p`
  font-size: 16px;
  color: #d1d5db;
  overflow: hidden;
  padding-left: 10px;

  overflow: scroll;
  display: flex;
  align-items: center;
`;

function ProjectCard({ project }) {
  const { language, _id, title, lastModified, projectFiles } = project;
  const file = projectFiles.find((item) => item.isEntryPoint);
  const extension = file.filename.split(".").pop();

  const navigate = useNavigate();
  return (
    <Container
      onClick={() => {
        navigate(`/app/project/${_id}/0`);
      }}
      className="card-meeting"
    >
      <PreviewCode
        extension={extension}
        projectId={_id}
        code={file.code}
        filename={file.filename}
      />
      <ContainerDetails>
        <LanguageDisplayer language={language} />
        <Title>{title}</Title>
        <Date>
          {moment.utc(lastModified).local().format(calendarDisplayFormat)}
        </Date>
      </ContainerDetails>
    </Container>
  );
}

export default ProjectCard;
