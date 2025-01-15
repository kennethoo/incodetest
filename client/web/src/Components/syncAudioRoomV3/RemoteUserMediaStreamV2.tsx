import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import useColor from "hooks/useColor";
import IconProfile from "Components/IconProfile";
import Initial from "Components/syncAudioRoomV3/Initial";
import { BiMicrophone, BiMicrophoneOff } from "react-icons/bi";
import useMeettumSdk from "hooks/useMeettumSdk";
import {
  mediaOn,
  mediaOff,
  mediaUnMuted,
} from "Components/syncAudioRoomV3/roomEnum";
import RemoteUserAudioStream from "Components/syncAudioRoomV3/RemoteUserAudioStream";
const Container = styled(motion.div)`
  display: flex;
  text-align: center;
  margin: 0 auto;
  background-color: var(--main-bg-cool-rgb);
  width: 98%;
  height: 98%;
  border-radius: 10px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
`;

const VideoContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;

  align-items: center;
  justify-content: center;
  & video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scaleX(-1);
    outline: none;
    border-radius: 10px;
  }
`;

const DisplaUserInfo = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: var(--main-bg-pagebox);
`;
const Username = styled.p`
  position: absolute;
  bottom: 5px;
  left: 5px;
  border-radius: 30px;
  font-size: 14px;
  padding: 2px 5px 2px 5px;

  text-align: start;

  background-color: rgba(111, 86, 229, 0.5);
  -webkit-backdrop-filter: blur(100px);
  backdrop-filter: blur(100px);

  max-width: calc(100% - 10px);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: white;
`;

const InitialCOntainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.2);
`;
const ImagePreviewContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Audio = styled.audio`
  position: absolute;
  z-index: -1;
  bottom: 0;
  right: 0;
  opacity: 0;
`;

const AudioIndicatior = styled.div`
  border: 3px solid rgba(111, 86, 229, 1);

  position: absolute;

  height: 100%;
  width: 100%;

  box-shadow: 0 0 0 0 rgba(111, 86, 229, 1);
  transform: scale(1);
  animation: pulse 1s infinite;
  border-radius: 10px;
  transition: all 0.3s ease;

  @keyframes pulse {
    0% {
      //transform: scale(0.95);
      box-shadow: inset 0 0 0 0 rgba(111, 86, 229, 0.7);
    }

    70% {
      // transform: scale(1);
      box-shadow: inset 0 0 0 10px rgba(111, 86, 229, 0);
    }

    100% {
      // transform: scale(0.95);
      box-shadow: inset 0 0 0 0 rgba(111, 86, 229, 0);
    }
  }
`;
const RemoteUserMediaStreamV2 = ({
  connectedUser,
  eventSessionId,
  animate = true,
}) => {
  const { videoStatus, audioStatus, uniqueUserSessionId } = connectedUser;

  const isAudioActive = audioStatus === mediaOn || audioStatus === mediaUnMuted;
  const { consumerService } = useMeettumSdk();
  const audioStreamRef = useRef(null);

  const [meettumSdk, _] = useState(consumerService);

  const [isInitialStateCreated, setIsInitialStateCreated] = useState(false);

  useEffect(() => {
    async function connectToServer() {
      await meettumSdk.initialServer({
        broadcasterId: uniqueUserSessionId,
        roomId: eventSessionId,
      });
      setIsInitialStateCreated(true);
    }
    connectToServer();
    return () => {
      setIsInitialStateCreated(false);
      meettumSdk.close();
    };
  }, [uniqueUserSessionId]);

  const handleAudio = async () => {
    if (isInitialStateCreated) {
      if (isAudioActive) {
        if (!meettumSdk.isAudioTrackConsumer) {
          const track = await meettumSdk.getUserAudioTrack();
          audioStreamRef.current.srcObject = track;
          await audioStreamRef?.current?.play();
          meettumSdk.isAudioTrackConsumer = true;
        }
      } else {
        if (audioStatus === mediaOff) {
          meettumSdk.isAudioTrackConsumer = false;
        }
      }
    }
  };
  useEffect(() => {
    const consumerMedia = async () => {
      if (isInitialStateCreated) {
        await handleAudio();
      }
    };
    consumerMedia();
  }, [videoStatus, audioStatus, isInitialStateCreated]);

  return (
    <Container>
      <Audio ref={audioStreamRef} />
    </Container>
  );
};

export default RemoteUserMediaStreamV2;
