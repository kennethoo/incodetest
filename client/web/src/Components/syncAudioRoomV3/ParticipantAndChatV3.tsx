import MeetingRoomChat from "Components/syncAudioRoomV3/MeetingRoomChat";
import ConnectedUser from "Components/syncAudioRoomV3/ConnectedUser";
import Tabs from "Components/shared/Tabs";
import styled from "styled-components";
import { motion } from "framer-motion";
import { IoCloseSharp } from "react-icons/io5";

const Container = styled(motion.div)`
  padding: 5px;
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;

  @media only screen and (max-width: 1000px) {
    width: 100% !important;
  }
`;

const TabContainer = styled.div`
  height: calc(100% - 60px);
  margin-top: 10px;
`;

function ParticipantAndChatV3({
  roomId,
  setIsParticipantAndChatOpen,
  setMeetingChatMesssages,
  meetingChatMesssages,
  userList,
}) {
  return (
    <Container
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 10,
        mass: 1,
        delay: 0.1,
      }}
    >
      <div className="bandadat-toshownp-profile">
        <div className="show-his-her-name">
          <button
            onClick={() => {
              setIsParticipantAndChatOpen(false);
            }}
            className="close-that"
          >
            <IoCloseSharp />
          </button>
          <div className="rkfjrkfmffn">Participants & Chats</div>
        </div>
      </div>
      <TabContainer>
        <Tabs
          tabsLabelsStyle={{
            justifyContent: "center",
          }}
          labelStyle={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          sections={[
            {
              label: "Chat",
              tabComponent: (
                <MeetingRoomChat
                  setIsParticipantAndChatOpen={setIsParticipantAndChatOpen}
                  meetingChatMesssages={meetingChatMesssages}
                  setMeetingChatMesssages={setMeetingChatMesssages}
                  meetingSessionId={roomId}
                />
              ),
            },
            {
              label: "Participants",
              tabComponent: (
                <ConnectedUser userList={userList} meetingSessionId={roomId} />
              ),
            },
          ]}
        />
      </TabContainer>
    </Container>
  );
}

export default ParticipantAndChatV3;
