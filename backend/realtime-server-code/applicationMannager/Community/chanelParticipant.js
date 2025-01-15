const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const channelsParticipant = new Schema({
  userId: String,
  spaceId: String,
  channelId: String,
});

const ChannelParticipant = mongoose.model(
  "channelsParticipant",
  channelsParticipant
);
class ChannelMannager {
  constructor() {}
  addParTicipantToChannels = async (payload) => {
    const participant = await ChannelParticipant.create(payload);
    return participant;
  };

  getInfo = async (query) => {
    try {
      const result = await ChannelParticipant.find(query);

      if (result) {
        return { result, succeeded: true };
      } else {
        return { succeeded: false, errorMessage: "spaf does not exite" };
      }
    } catch (error) {
      return { errorMessage: error.message, succeeded: false };
    }
  };
}

const channelsParticipantApi = new ChannelMannager();
module.exports = { channelsParticipantApi };
