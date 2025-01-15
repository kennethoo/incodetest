import { useEffect, useRef, useState } from "react";
import useUser from "hooks/useUser";
import styled from "styled-components";
import { motion } from "framer-motion";
import useColor from "hooks/useColor";
import Initial from "Components/syncAudioRoomV3/Initial";
import IconProfile from "Components/IconProfile";
import { BiMicrophone, BiMicrophoneOff } from "react-icons/bi";
import { mediaOn, mediaUnMuted } from "Components/syncAudioRoomV3/roomEnum";
import LocalAudioStream from "Components/syncAudioRoomV3/LocalAudioStream";

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

const WrapMenu = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  opacity: 0;

  &:hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.5);
  }
`;
function LocalMediaStreamV2({
  myStream,
  connectedUser,
  audioStream,
  animate = true,
}) {
  return <Container />;
}
export default LocalMediaStreamV2;
