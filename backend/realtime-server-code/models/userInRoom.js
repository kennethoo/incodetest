const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userInSession = new Schema({
  userId: String,
  sessionRoom: [
    {
      sessionRoomId: String,
    },
  ],
});
const UserInSession = mongoose.model("userInsession", userInSession);
module.exports = UserInSession;
