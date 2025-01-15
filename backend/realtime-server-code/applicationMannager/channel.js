const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { spacesParticipantApi } = require("./Community/spacesParticipant");
const generateUUID = require("../utility/generateUUID");
const { messageApi } = require("./Community/channelsMessage");
const { channelsParticipantApi } = require("./Community/chanelParticipant");
// design a muitople chatting systmet
// protocal to create a space
// create a space
// add a partianbt to space
// remove a partianbt to a space
// create  sections chanles when you create a state ,
//export the Api
//add testing
const channel = new Schema({
  channelId: String,
  channelOwnerIds: [{ type: String }],
  participantIds: [{ type: String }],
  numberOfMembers: Number,
  name: String,
  profileUrl: String,
  channelType: String,
});

const Channel = mongoose.model("communicationspace", channel);
class ChannelApi {
  constructor() {
    this.ACTION_CREATE_NEW_SPACE = "create_new_space";
    this.ACTION_CREATE_NEW_SUBSPACE = "create_new_subspace";
    this.ACTION_CREATE_NEW_CHANEL = "create_new_channels";
    this.ACTION_CREATE_NEW_MESSAGE = "create_new_message";
    this.ACTION_ADD_USER_TO_CHANNEL = "add_user_to_channel";
    this.LEAVE_CHANNEL = "leave_channel";

    //type of channel
    this.TYPE_PRIVATE_CHANNEL = "private_channel";
    this.TYPE_GROUP_CHANNEL = "group_channel";
  }
  // this is to created a space

  handleCreateAction = (payload) => {
    const { action } = payload;
    if (action == this.ACTION_CREATE_NEW_CHANEL) {
      return this.createChannel(payload);
    }
    if (action == this.CREATE_NEW_MESSAGE) {
      return this.createMessage(payload);
    }
    if (action == this.ADD_USER_TO_CHANNEL) {
      return this.addUserToChannel(payload);
    }
    if (action == this.LEAVE_CHANNEL) {
      return this.leaveChannel(payload);
    }
    return { succeeded: false, errorMessage: "not meething" };
  };

  createChannel = async (payload) => {
    const { userId, channelType } = payload;
    if (!userId || !channelType) {
      return { succeeded: false, errorMessage: "missing info" };
    }
    if (channelType === this.TYPE_PRIVATE_CHANNEL) {
      return this.createPrivateChannel(payload);
    }
    if (channelType === this.TYPE_GROUP_CHANNEL) {
      return this.createGroupChannel(payload);
    }
    return { succeeded: false, errorMessage: "Incorrect info" };
  };

  getChannelById = async (channelId) => {
    const channel = await Channel.findOne({ channelId });
    return channel;
  };

  async createPrivateChannel(data) {
    const { userId, participantIds } = data;
    if (!userId || !participantIds) {
      return { succeeded: false, errorMessage: "missing info" };
    }
    const channelId = await generateUUID();
    const payload = {
      channelId,
      channelOwnerIds: participantIds,
      channelType: this.TYPE_PRIVATE_CHANNEL,
      participantIds,
    };
    const channel = await Channel.create(payload);
    return { succeeded: true, channel: channel._doc };
  }
  async createGroupChannel(data) {
    const { userId, participantIds, name, channelOwnerIds } = data;
    if (!userId || !participantIds || !name || !channelOwnerIds) {
      return { succeeded: false, errorMessage: "missing info" };
    }
    const channelId = await generateUUID();
    const payload = {
      channelId,
      channelOwnerIds,
      channelType: this.TYPE_GROUP_CHANNEL,
      participantIds,
      name,
    };
    const channel = await Channel.create(payload);
    return { succeeded: true, channel: channel._doc };
  }

  async deletePrivateChannel(data) {
    const { channelId } = data;
    if (!channelId) {
      return { succeeded: false, errorMessage: "missing info" };
    }
    await Channel.deleteOne({ channelId });
    return { succeeded: true };
  }

  addParticipant = async (payload) => {
    return spacesParticipantApi.addParticiapant(payload);
  };

  getChannelInfo = async (query) => {
    const { recordType } = query;
    delete query.recordType;

    try {
      let channel = null;
      if (recordType == "many") {
        channel = await Channel.find(query);
      } else {
        channel = await Channel.findOne(query);
      }

      if (channel) {
        return { channel, succeeded: true };
      } else {
        return {
          succeeded: false,
          errorMessage: "nothign that mach this record",
        };
      }
    } catch (error) {
      return { errorMessage: error.message, succeeded: false };
    }
  };

  getMessages = async (query) => {
    return await messageApi.getData(query);
  };
  addUserToChannel = async (payload) => {
    return await channelsParticipantApi.addParTicipantToChannels(payload);
  };

  leaveChannel = async (payload) => {
    const { channelId, userId } = payload;

    if (!channelId || !userId) {
      return { succeeded: false, errorMessage: "missing info" };
    }

    const channel = await Channel.findOne({ channelId });
    if (!channel) {
      return { succeeded: false, errorMessage: "missing info" };
    }

    await Channel.updateOne(
      {
        channelId,
      },
      {
        $pull: {
          participantIds: userId,
        },
      }
    );
    return { succeeded: true };
  };

  getParticipantfromChannel = async (query) => {
    return await channelsParticipantApi.getInfo(query);
  };
}

const channelApi = new ChannelApi();
module.exports = { channelApi };
