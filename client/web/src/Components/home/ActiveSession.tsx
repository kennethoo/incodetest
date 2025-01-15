import styled from "styled-components";
import NoSessionEmptyState from "Components/home/NoSessionEmptyState";
import useUser from "hooks/useUser";
import SessionCard from "Components/Session/SessionCard";
import { useActiveSession } from "hooks/session/useActiveSession";
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
function ActiveSession() {
  const { user } = useUser();
  const { activeSessionsResult, isLoading } = useActiveSession();

  const renderData = () => {
    if (isLoading) {
      return null;
    }

    if (activeSessionsResult) {
      if (!activeSessionsResult.length) {
        return <NoSessionEmptyState />;
      } else {
        return (
          <ProjectsContainer>
            {activeSessionsResult?.map((session) => {
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
          <Title>Ongoing Session</Title>
        </Wraper>
      </Header>
      {renderData()}
    </Container>
  );
}

export default ActiveSession;
