const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const meetingRoomSession = new Schema({
  meetingRoomSessionId: String,
  connectedUsers: [
    {
      userId: String,
      socketId: String,
      username: String,
      videoStatus: String,
      audioStatus: String,
      isScreenOn: Boolean,
    },
  ],
});
const MeetingRoomSession = mongoose.model(
  "meetingroomsession",
  meetingRoomSession,
);
module.exports = MeetingRoomSession;
