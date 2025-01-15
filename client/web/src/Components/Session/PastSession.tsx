import styled from "styled-components";
import SessionCard from "Components/Session/SessionCard";
import { usePastSession } from "hooks/session/usePastSession";
import NoPastSessionEmptyState from "Components/Session/NoPastSessionEmptyState";
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
  padding-right: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  padding-bottom: 10px;
  max-height: 100%;
  grid-gap: 20px;
  overflow: scroll;
`;

const Wraper = styled.div`
  display: flex;
  align-items: center;
`;
function PastSession() {
  const { pastSessionsResult, isLoading } = usePastSession();

  const renderData = () => {
    if (isLoading) {
      return null;
    }
    if (pastSessionsResult) {
      console.log(pastSessionsResult);
      if (!pastSessionsResult.length) {
        return <NoPastSessionEmptyState />;
      } else {
        return (
          <ProjectsContainer>
            {pastSessionsResult?.map((session) => {
              return <SessionCard key={session._id} session={session} />;
            })}
          </ProjectsContainer>
        );
      }
    }
  };

  return (
    <Container>
      <Header>
        <Wraper>
          <Title>Archive Session</Title>
        </Wraper>
      </Header>
      {renderData()}
    </Container>
  );
}

export default PastSession;
