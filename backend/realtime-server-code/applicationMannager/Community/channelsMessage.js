const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const channelsMessage = new Schema({
  channelId: String,
  creatorId: String,
  messageContent: String,
  date: String,
});

const Message = mongoose.model("messagechanel", channelsMessage);
class MessageApi {
  constructor() {
    this.CREATE_NEW_SPACE = "create_new_space";
    this.CREATE_NEW_SUBSPACE = "create_new_subspace";
    this.CREATE_NEW_CHANEL = "create_new_channels";
  }
  // this is to created a space

  handleCreateAction = (payload) => {
    const { action } = payload;
    if (action == this.CREATE_NEW_SPACE) {
      return this.createSpace(payload);
    }
    if (action == this.CREATE_NEW_SUBSPACE) {
      return this.createSubSpaces({
        userId: payload.userId,
        subSpaceName: payload.name,
        channelName: "main",
        spaceId: payload.spaceId,
      });
    }
    if (action == this.CREATE_NEW_CHANEL) {
      return this.createNewChanel(payload);
    }

    return { succeeded: false, errorMessage: "not meething" };
  };

  createMessage = async (payload) => {
    const message = await Message.create(payload);
    return { succeeded: true, message };
  };

  getData = async (query) => {
    const messages = await Message.find(query);

    return { succeeded: true, messages };
  };
}

const messageApi = new MessageApi();
module.exports = { messageApi };
