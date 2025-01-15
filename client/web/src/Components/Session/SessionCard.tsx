import styled from "styled-components";
import LanguageDisplayer from "Components/LanguageDisplayer";
import { useNavigate } from "react-router-dom";
import PreviewCode from "Components/project/PreviewCode";
import moment from "moment";
import { calendarDisplayFormat } from "utility/momentFormat";
import IconProfile from "Components/IconProfile";
import Username from "Components/Username";
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
  font-weight: bolder;
`;
const Date = styled.p`
  font-size: 16px;
  color: #d1d5db;
  overflow: hidden;

  overflow: scroll;
  display: flex;
  align-items: center;
`;

const SectionContainer = styled.div`
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  align-items: center;
  margin-top: 5px;
`;

const SectionTitle = styled.div`
  color: #d1d5db;
  padding-top: 5px;
  padding-bottom: 5px;
  letter-spacing: 1px;

  font-size: 15px;
`;

const SectionContentContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Span = styled.span`
  margin-right: 5px;
`;
function SessionCard({ session }) {
  const { language, _id, title, lastModified, files, endTime } = session;
  const file = files.find((item) => item.isEntryPoint);
  const extension = file?.filename.split(".").pop();

  const navigate = useNavigate();
  return (
    <Container
      onClick={() => {
        navigate(`/app/session/${_id}/0`);
      }}
      className="card-meeting"
    >
      <PreviewCode
        extension={extension}
        projectId={_id}
        code={file?.code}
        filename={file?.filename}
      />
      <SectionContainer>
        <SectionContentContainer>
          <LanguageDisplayer language={language} />
        </SectionContentContainer>
      </SectionContainer>
      <SectionContainer>
        <SectionContentContainer>
          <Title>{title}</Title>
        </SectionContentContainer>
      </SectionContainer>

      <SectionContainer>
        <SectionContentContainer>
          <Date>
            <Span>last modified on</Span>
            {moment.utc(lastModified).local().format(calendarDisplayFormat)}
          </Date>
        </SectionContentContainer>
      </SectionContainer>
      <SectionContainer>
        <SectionContentContainer>
          <Date>
            <Span>Will end on</Span>

            {moment.utc(endTime).local().format(calendarDisplayFormat)}
          </Date>
        </SectionContentContainer>
      </SectionContainer>
    </Container>
  );
}

export default SessionCard;
