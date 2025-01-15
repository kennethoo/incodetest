import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BiMicrophone, BiMicrophoneOff } from "react-icons/bi";
import { IoCloseSharp } from "react-icons/io5";
import { BsCameraVideoOff, BsCameraVideoFill } from "react-icons/bs";
import useUser from "hooks/useUser";
import LoadingSpin from "Components/Loadingspin";
import useLogger from "hooks/useLogger";
import styled from "styled-components";
import Initial from "Components/syncAudioRoomV3/Initial";
import { mediaOn, mediaOff } from "Components/syncAudioRoomV3/roomEnum";
import Toggle from "Components/shared/Toggle";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ApplicationContainer = styled.div``;

function AudioRoomLobby({
  isJoining,
  joinMeeting,
  audioStatus,
  setAudioStatus,
  isRoomCallActive,
}) {
  const userStream: any = useRef();
  const logger = useLogger();
  const isAudioOn = audioStatus === mediaOn;

  async function getStream({
    audio,
    video,
  }: {
    audio: boolean;
    video: boolean;
  }) {
    try {
      if (video) {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio,
          video,
        });
        if (userStream && userStream.current) {
          userStream.current.srcObject = stream;
          userStream.videoStream = stream;
        }
      }
    } catch (error) {
      logger({
        isErrorMessage: true,
        message: error.message,
        fileName: "AudioRoomLobby.tsx",
      });
    }
  }

  useEffect(() => {
    getStream({ audio: isAudioOn, video: false });
    return () => {};
  }, []);

  const originalButon = {
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: 0,
    marginRight: "10px",
    cursor: "pointer",
    backgroundColor: "rgba(0,0,0,0.2)",
    backdropFilter: "blur(50px)",
    color: "white",
    fontSize: "18px",
  };
  const microphoneStyle = isAudioOn
    ? originalButon
    : {
        ...originalButon,
        backgroundColor: "rgba(192, 57, 43,0.8)",
      };

  return (
    <ApplicationContainer>
      <Container>
        <Toggle
          setToggle={(value) => {
            if (value) {
              joinMeeting();
            }
          }}
          value={isRoomCallActive}
        />
      </Container>
    </ApplicationContainer>
  );
}

export default AudioRoomLobby;
