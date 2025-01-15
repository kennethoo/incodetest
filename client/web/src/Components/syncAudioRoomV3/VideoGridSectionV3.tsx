import RemoteUserMediaStreamV2 from "Components/syncAudioRoomV3/RemoteUserMediaStreamV2";
import LocalMediaStreamV2 from "Components/syncAudioRoomV3/LocalMediaStreamV2";
import styled from "styled-components";
import AudioGridSectionColumn from "Components/syncAudioRoomV3/AudioGridSectionColumn";
import structureMeetingRoomVideoGrid from "utility/structureMeetingRoomVideoGrid";
import { CarouselV2 } from "Components/shared/CarouselV2";

const Container = styled.div`
  width: 100%;
  display: block;
  display: inline-flex;
`;

function VideoGridSectionV3({
  uniqueUserSessionId,
  roomId,
  myStream,
  userList,
  isScreenSharingOn,
  isSideMenuOpen,
  audioStream,
}) {
  const renderElement = () => {
    const structureUserInRomData = structureMeetingRoomVideoGrid(userList);
    return structureUserInRomData.map((currentSectionData, index) => {
      return (
        <AudioGridSectionColumn
          key={index}
          data={currentSectionData.map((connectedUser) => {
            if (uniqueUserSessionId === connectedUser.uniqueUserSessionId) {
              return (
                <LocalMediaStreamV2
                  animate={true}
                  myStream={myStream}
                  audioStream={audioStream}
                  key={connectedUser.uniqueUserSessionId}
                  connectedUser={connectedUser}
                />
              );
            } else {
              return (
                <RemoteUserMediaStreamV2
                  animate={true}
                  connectedUser={connectedUser}
                  key={connectedUser.uniqueUserSessionId}
                  eventSessionId={roomId}
                />
              );
            }
          })}
        />
      );
    });
  };

  return (
    <Container
      className={`grid-of-video ${isScreenSharingOn ? "screenSharingOn" : ""}`}
    >
      <CarouselV2 listOfData={renderElement()} />
    </Container>
  );
}

export default VideoGridSectionV3;
