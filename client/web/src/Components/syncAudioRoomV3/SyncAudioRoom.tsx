import { useState, useEffect, useRef } from "react";
import RoomSessionV3 from "Components/syncAudioRoomV3/RoomSessionV3";
import AudioRoomLobby from "Components/syncAudioRoomV3/AudioRoomLobby";
import socketMediaServer from "mediaServerConfig";

import useUser from "hooks/useUser";
import useLogger from "hooks/useLogger";
import generateUUID from "utility/generateUUID";
import useMeettumSdk from "hooks/useMeettumSdk";
import {
  mediaOn,
  mediaOff,
  mediaUnMuted,
  mediaMuted,
} from "Components/syncAudioRoomV3/roomEnum";

const SyncAudioRoom = ({ roomId, goback }) => {
  const logger = useLogger();
  const { user } = useUser();
  const [isJoining, setIsJoining] = useState(false);
  const [isRoomCallActive, setIsRoomCallActive] = useState(false);
  const [videoStatus, setVideoStatus] = useState<string>(mediaOff);
  const [audioStatus, setAudioStatus] = useState<string>(mediaOn);
  const [isScreenOn, setIsScreenOn] = useState<boolean>(false);
  const [joinRoom, setJoinRoom] = useState(false);
  const videoStream: any = useRef();
  const audioStream: any = useRef();
  const screenShareRef: any = useRef();

  const { producerService } = useMeettumSdk();
  const [uniqueUserSessionId, setUniqueUserSessionId] = useState("");

  const [meettumSdk, _] = useState(producerService);

  useEffect(() => {
    const initConnection = async () => {
      const uniqueId: any = await generateUUID();
      setUniqueUserSessionId(uniqueId);
    };
    initConnection();
  }, []);

  const joinMeeting = async () => {
    if (isJoining || !uniqueUserSessionId) return;
    setIsJoining(true);
    setIsRoomCallActive(true);
    try {
      await meettumSdk.initServer({
        uniqueId: uniqueUserSessionId,
        roomId,
      });
      if (videoStatus === mediaOn) {
        await produceVideoTrack();
      }
      if (audioStatus === mediaOn) {
        await produceAudioTrack();
      }
      setJoinRoom(true);
      socketMediaServer.emit("join:room", {
        userId: user.userId,
        username: user.username,
        meetingRoomSessionId: roomId,
        videoStatus,
        audioStatus,
        isScreenOn,
        uniqueUserSessionId,
      });
    } catch (error) {
      logger({
        isErrorMessage: true,
        message: error.message,
        fileName: "SyncAudioRoom.tsx",
      });
    }
  };

  async function produceAudioTrack() {
    const { succeeded } = await meettumSdk.produceAudioTrack(audioStream);
    if (succeeded) {
      meettumSdk?.audioProducer?.on("trackended", async () => {
        await meettumSdk.stopAudio();
        await controlAudio(mediaOff);
        await controlAudio(mediaOn);
      });
    }
  }

  async function produceVideoTrack() {
    const { succeeded } = await meettumSdk.produceVideoTrack(videoStream);
    if (succeeded) {
      meettumSdk?.videoProducer?.on("trackended", async () => {
        logger({
          isErrorMessage: false,
          message: "Video Track ended",
          shouldDisplay: false,
          fileName: "PrivateMeetingRoom.tsx",
        });
        await meettumSdk.stopVideo();
        await controlVideo(mediaOff);
        await controlVideo(mediaOn);
      });
    }
  }

  async function publishScreenTrack() {
    const { succeeded, errorMessage } =
      await meettumSdk.produceVideoScreenTrack(screenShareRef);
    if (succeeded) {
      meettumSdk?.videoScreenProducer?.on("trackended", () => {
        shareScreen(false);
      });
      setIsScreenOn(true);
      socketMediaServer.emit("streamStatusChange", {
        meetingRoomSessionId: roomId,
        userId: uniqueUserSessionId,
        audioStatus,
        videoStatus,
        isScreenOn: true,
      });
    } else {
      logger({
        isErrorMessage: true,
        message: errorMessage,
        fileName: "PrivateMeetingRoom.tsx",
      });
    }
  }

  useEffect(() => {
    return () => {
      handleLeaveClick();
    };
  }, []);

  async function toogleVideo(videoStatus) {
    if (videoStatus === mediaUnMuted) {
      await meettumSdk.resumeMediaTrack({
        kind: meettumSdk.video,
      });
    } else if (videoStatus === mediaMuted) {
      await meettumSdk.pauseMediaTrack({
        kind: meettumSdk.video,
      });
    } else if (videoStatus === mediaOn) {
      await produceVideoTrack();
    } else if (videoStatus === mediaOff) {
      meettumSdk.isVideoTrackPublished = false;
    }
  }

  async function toogleAudio(audioStatus) {
    if (audioStatus === mediaUnMuted) {
      await meettumSdk.resumeMediaTrack({
        kind: meettumSdk.audio,
      });
    } else if (audioStatus === mediaMuted) {
      await meettumSdk.pauseMediaTrack({
        kind: meettumSdk.audio,
      });
    } else if (audioStatus === mediaOn) {
      await produceAudioTrack();
    } else if (audioStatus === mediaOff) {
      meettumSdk.isAudioTrackPublished = false;
      //rare case
      /// strop the audi track
    }
  }

  async function controlVideo(videoStatus) {
    try {
      await toogleVideo(videoStatus);
      setVideoStatus(videoStatus);
      socketMediaServer.emit("streamStatusChange", {
        meetingRoomSessionId: roomId,
        userId: uniqueUserSessionId,
        audioStatus,
        videoStatus,
        isScreenOn,
      });
    } catch (error) {
      logger({
        isErrorMessage: true,
        message: error.message,
        fileName: "PrivateMeetingRoom.tsx",
      });
    }
  }

  async function controlAudio(audioStatus) {
    try {
      await toogleAudio(audioStatus);
      setAudioStatus(audioStatus);
      socketMediaServer.emit("streamStatusChange", {
        meetingRoomSessionId: roomId,
        userId: uniqueUserSessionId,
        audioStatus,
        videoStatus,
        isScreenOn,
      });
    } catch (error) {
      logger({
        isErrorMessage: true,
        message: error.message,
        fileName: "MeetingRoom.tsx",
      });
    }
  }

  async function shareScreen(isScreenOn) {
    try {
      if (isScreenOn) {
        await publishScreenTrack();
      } else {
        await meettumSdk.stopSharingScreen();
        screenShareRef.current?.getTracks().forEach((track) => {
          track.stop();
        });
        setIsScreenOn(isScreenOn);
        socketMediaServer.emit("streamStatusChange", {
          meetingRoomSessionId: roomId,
          userId: uniqueUserSessionId,
          audioStatus,
          videoStatus,
          isScreenOn,
        });
      }
    } catch (error) {
      logger({
        isErrorMessage: true,
        message: error.message,
        fileName: "SyncAudioRoom.tsx",
      });
    }
  }

  const handleLeaveClick = async () => {
    try {
      socketMediaServer.emit("leave-room", roomId);
      videoStream.current?.getTracks().forEach(async (track) => {
        await track.stop();
      });
      audioStream.current?.getTracks().forEach(async (track) => {
        await track.stop();
      });
      screenShareRef.current?.getTracks().forEach(async (track) => {
        await track.stop();
      });
      meettumSdk.close();
      setIsJoining(false);
      setIsRoomCallActive(false);
      setJoinRoom(false);
      goback();
    } catch (error) {
      logger({
        isErrorMessage: true,
        message: error.message,
        fileName: "SyncAudioRoom.tsx",
      });
      console.log("Failed to leave the channel:", error);
    }
  };

  return joinRoom ? (
    <RoomSessionV3
      roomId={roomId}
      uniqueUserSessionId={uniqueUserSessionId}
      handleLeaveClick={handleLeaveClick}
      myStream={videoStream.current}
      audioStream={audioStream.current}
    />
  ) : (
    <AudioRoomLobby
      isRoomCallActive={isRoomCallActive}
      setAudioStatus={setAudioStatus}
      audioStatus={audioStatus}
      joinMeeting={joinMeeting}
      isJoining={isJoining}
    />
  );
};

export default SyncAudioRoom;
