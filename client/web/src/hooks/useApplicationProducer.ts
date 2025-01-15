import socket from "realtimeBoardSocket";
const eventEnum = {
  meetingSessionCreated: "meetingSessionCreated",
  meetingSessionRemove: "meetingSessionRemove",
  taskRemove: "taskRemove",
  taskCreated: "taskCreated",
  invitationReceive: "invitationReceive",
  newMessageCreated: "newMessageCreated",
};
function useApplicationProducer() {
  const broadCastEvent = (eventName, userId, data) => {
    socket.emit("broadcast:event", { eventName, userId, data });
  };

  return { eventEnum, broadCastEvent };
}
export default useApplicationProducer;
