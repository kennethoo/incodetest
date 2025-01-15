import { useState, useEffect, useRef } from "react";

import { IoSendSharp } from "react-icons/io5";
import generateUUID from "utility/generateUUID";
import userUser from "hooks/useUser";
import socket from "realtimeBoardSocket";
import ChatMessage from "Components/syncAudioRoomV3/ChatMessage";
import EditableChat from "Components/shared/EditableChat";

import styled from "styled-components";
const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
`;

const SendButton = styled.button`
  position: relative;
  display: flex;
  min-width: 45px;
  max-width: 45px;
  height: 45px;
  background-color: transparent;
  border-radius: 30px;
  color: var(--text);
  border: 0;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  margin: 10px;
  background-color: var(--main-bg-cool-rgb);
`;
const ChatContainer = styled.div`
  padding-top: 20px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  overflow: scroll;
`;
const ChatWrapper = styled.div`
  display: flex;
  height: 100%;
  overflow: hidden;
`;
const MessgeInputContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 5px;
  padding-left: 10px;
  border-top: 1px solid var(--main-bg-cool-rgb);
`;
const MessgeInputContent = styled.div`
  width: 100%;
  border-radius: 30px;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: var(--main-bg-cool-rgb);
  align-items: center;
  justify-content: center;
  display: flex;
`;
function MeetingRoomChat({
  meetingSessionId,
  meetingChatMesssages,
  setMeetingChatMesssages,
  setIsParticipantAndChatOpen,
}) {
  const chatInput: any = useRef();
  const messageHolder: any = useRef();

  const { user } = userUser();
  const [myMessage, setMyMessage] = useState("");
  const canSendMessage = myMessage.trim().length > 0;

  const sendmessage = async () => {
    if (myMessage.trim().length > 0) {
      const messagePayLoad = {
        userId: user.userId,
        content: myMessage,
        meetingSessionId,
        username: user.username,
        id: await generateUUID(),
      };

      setMyMessage("");
      socket.emit("send:message:meetingRoom", messagePayLoad);
    }
  };
  const addMessage = (e) => {
    setMyMessage(e.target.innerText);
  };
  function smoothScrollToBottom(element) {
    const targetScroll = element.scrollHeight - element.clientHeight;
    const scrollStep = (targetScroll - element.scrollTop) / 10;

    function scroll() {
      element.scrollTop += scrollStep;
      if (Math.abs(element.scrollTop - targetScroll) > Math.abs(scrollStep)) {
        requestAnimationFrame(scroll);
      }
    }

    requestAnimationFrame(scroll);
  }

  useEffect(() => {
    return () => {
      if (messageHolder.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        // messageHolder.current.scrollTop = messageHolder?.current?.scrollHeight;
        smoothScrollToBottom(messageHolder.current);
      }
    };
  }, [meetingChatMesssages, setMeetingChatMesssages]);
  useEffect(() => {
    if (messageHolder.current) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      messageHolder.current.scrollTop = messageHolder?.current?.scrollHeight;
    }
  }, []);

  return (
    <Container>
      <ChatWrapper>
        <ChatContainer ref={messageHolder}>
          {meetingChatMesssages.map((chat) => {
            return <ChatMessage chat={chat} key={chat.id} />;
          })}
        </ChatContainer>
      </ChatWrapper>

      <MessgeInputContainer>
        <MessgeInputContent>
          <EditableChat
            placeholder={"Type Something...."}
            value={myMessage}
            onChange={setMyMessage}
            onSendMessageWhenEnter={sendmessage}
          />
        </MessgeInputContent>

        <SendButton
          style={{
            backgroundColor: canSendMessage
              ? "#6f56e5"
              : "var(--main-bg-cool-rgb)",
          }}
          onClick={sendmessage}
        >
          <IoSendSharp />
        </SendButton>
      </MessgeInputContainer>
    </Container>
  );
}

export default MeetingRoomChat;
