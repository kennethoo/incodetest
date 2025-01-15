const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const spacesParticipant = new Schema({
  userId: String,
  name: String,
  profileUrl: String,
  spaceId: String,
  profile: {
    username: String,
    fullName: String,
    profileUrl: String,
    blocked: Boolean,
    website: String,
    bio: String,
    timeZone: String,
    email: String,
    isAdmin: Boolean,
  },
});

const SpaceParticipant = mongoose.model("spaceParticipant", spacesParticipant);
class SpaceMannager {
  constructor() {}
  addParticiapant = async (payload) => {};
}

const spacesParticipantApi = new SpaceMannager();
module.exports = { spacesParticipantApi };
