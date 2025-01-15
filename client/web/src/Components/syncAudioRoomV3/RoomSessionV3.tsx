import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AudioRoomActionV3 from "Components/syncAudioRoomV3/AudioRoomActionV3";
import useUser from "hooks/useUser";
import VideoGridSectionV3 from "Components/syncAudioRoomV3/VideoGridSectionV3";
import styled from "styled-components";
import socketMediaServer from "mediaServerConfig";

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  background-color: var(--main-bg-pagebox);
  position: relative;
`;
const VideoCallAndScreenShareContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
`;

const AudioCallSection = styled.div`
  position: relative;
  width: 100%;

  margin: 0 auto;
  display: flex;
`;

const RoomSessionV3 = ({
  myStream,
  handleLeaveClick,
  uniqueUserSessionId,
  audioStream,
  roomId,
}) => {
  const { user } = useUser();
  const navigation = useNavigate();
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const handleUserConnected = ({ allUserInMeetingRoomSession }) => {
      setUserList(allUserInMeetingRoomSession);
    };

    const handleUserStreamStatusChange = ({
      userId,
      audioStatus,
      videoStatus,
      isScreenOn,
    }) => {
      setUserList((prev) => {
        const findUserDetails = prev.find((remoteUser) => {
          return remoteUser.uniqueUserSessionId === userId;
        });
        if (!findUserDetails) {
          return prev;
        }
        const updatedUserDetails = {
          ...findUserDetails,
          audioStatus,
          videoStatus,
          isScreenOn,
        };

        const index = prev.findIndex((remoteUser) => {
          return remoteUser.uniqueUserSessionId === userId;
        });
        const updateList = [...prev];
        updateList.splice(index, 1, updatedUserDetails);
        return [...updateList];
      });
    };

    const handleUserDisconnected = (userId) => {
      if (userId === socketMediaServer.id) {
        navigation("/register");
      } else {
        setUserList((prev) => {
          const otherUserThanMe = [...prev].filter(
            (connectedUser) => connectedUser.socketId !== userId,
          );
          return otherUserThanMe;
        });
      }
    };

    socketMediaServer.on("user-connected", handleUserConnected);
    socketMediaServer.on("user-disconnected", handleUserDisconnected);
    socketMediaServer.on(
      "newStreamStatusFromUser",
      handleUserStreamStatusChange,
    );

    return () => {
      socketMediaServer.off("user-connected", handleUserConnected);
      socketMediaServer.off("user-disconnected", handleUserDisconnected);
      socketMediaServer.off(
        "newStreamStatusFromUser",
        handleUserStreamStatusChange,
      );
    };
  }, [uniqueUserSessionId, user.userId]);

  return (
    <Container>
      <AudioCallSection>
        <VideoCallAndScreenShareContainer>
          <VideoGridSectionV3
            uniqueUserSessionId={uniqueUserSessionId}
            myStream={myStream}
            audioStream={audioStream}
            isScreenSharingOn={false}
            isSideMenuOpen={false}
            userList={userList}
            roomId={roomId}
          />
        </VideoCallAndScreenShareContainer>
      </AudioCallSection>
      <AudioRoomActionV3 handleLeaveClick={handleLeaveClick} />
    </Container>
  );
};

export default RoomSessionV3;
