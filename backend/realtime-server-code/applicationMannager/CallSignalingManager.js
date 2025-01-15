const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { applicationEventApi } = require("./applicationEvent");
const { channelApi } = require("./channel");
const { eventNames } = require("../models/userInRoom");
const callSession = new Schema({
  callerId: String,
  spaceId: String,
});

const CallSession = mongoose.model("activeCallSession", callSession);
module.exports = CallSession;

class CallSignalingManager {
  constructor() {}

  iniateCall = async ({ callerId, spaceId, io }) => {
    const call = await CallSession.findOne({ spaceId });
    if (call) {
      return { succeeded: true, shouldPing: false };
    } else {
      //we will create an entry and this client will ping everyone
      //await CallSession.create({ spaceId, callerId });
      const channel = await channelApi.getChannelById(spaceId);
      this.notify(io, channel.participantIds, callerId, spaceId);
      return {
        succeeded: true,
        recipients: channel.participantIds,
      };
    }
  };

  notify = (io, recipients, callerId, spaceId) => {
    for (const userId of recipients) {
      if (callerId !== userId) {
        io.to(userId).emit("event:message", {
          eventName: applicationEventApi.incomingCall,
          userId,
          data: { callerId, spaceId },
        });
      }
    }
  };
}

const callSignalingManager = new CallSignalingManager();

module.exports = callSignalingManager;
