import PeopleDetails from "Components/syncAudioRoomV3/PeopleDetails";
import InviteParticipantToMeeting from "Components/syncAudioRoomV3/InviteParticipantToMeeting";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const ContainerList = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  padding: 5px;
`;

function ConnectedUser({ meetingSessionId, userList }) {
  return (
    <Container>
      {/* <InviteParticipantToMeeting meetingSessionId={meetingSessionId} /> */}
      <ContainerList>
        {userList.map((user) => {
          return <PeopleDetails key={user.socketId} userDetail={user} />;
        })}
      </ContainerList>
    </Container>
  );
}
export default ConnectedUser;
