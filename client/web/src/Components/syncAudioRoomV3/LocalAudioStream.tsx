import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { mediaOn, mediaUnMuted } from "Components/syncAudioRoomV3/roomEnum";
import useDebounce from "hooks/useDebounce";

const Audio = styled.audio`
  position: absolute;
  z-index: -1;
  bottom: 0;
  right: 0;
  opacity: 0;
`;
function LocalAudioStream({ connectedUser, audioStream, setIsSomeOneTalking }) {
  const { audioStatus } = connectedUser;
  const audioContext: any = useRef(null);
  const audioStreamRef = useRef(null);
  const [analyser, setAnalyser] = useState(null);
  const [dataArray, setDataArray] = useState(null);
  const [bufferLength, setBufferLength] = useState(null);
  const isAudioOn = audioStatus === mediaOn || audioStatus === mediaUnMuted;
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const debounceValue = useDebounce(isUserSpeaking, 100);

  useEffect(() => {
    if (isAudioOn && audioStream) {
      setupEnging();
    } else {
    }
  }, [isAudioOn, audioStream]);

  useEffect(() => {
    setIsSomeOneTalking(debounceValue);
  }, [debounceValue]);

  const setupEnging = () => {
    if (audioStream && audioStreamRef.current && !audioContext.current) {
      const AudioContext = window.AudioContext;
      audioContext.current = new AudioContext();
      const source = audioContext.current.createMediaStreamSource(audioStream);
      const analyser = audioContext.current.createAnalyser();
      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      source.connect(analyser);
      setAnalyser(analyser);
      setDataArray(dataArray);
      setBufferLength(bufferLength);
    }
  };

  function checkForSpeech(analyser, dataArray, bufferLength) {
    if (!analyser || !dataArray || !bufferLength) return;
    analyser.getByteTimeDomainData(dataArray);
    let sum = 0;
    for (let i = 0; i < bufferLength; i++) {
      sum += Math.abs(dataArray[i] - 128);
    }
    const average = sum / bufferLength;
    setIsUserSpeaking(average > 1);
  }

  useEffect(() => {
    let animationFrameId;
    const checkForSpeechLoop = () => {
      checkForSpeech(analyser, dataArray, bufferLength);

      animationFrameId = requestAnimationFrame(checkForSpeechLoop);
    };
    if (analyser && dataArray && bufferLength) {
      checkForSpeechLoop();
    }
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [analyser, dataArray, bufferLength]);

  useEffect(() => {
    return () => {
      if (audioContext.current) {
        audioContext.current.close();
      }
    };
  }, []);

  return <Audio muted={true} ref={audioStreamRef}></Audio>;
}
export default LocalAudioStream;
