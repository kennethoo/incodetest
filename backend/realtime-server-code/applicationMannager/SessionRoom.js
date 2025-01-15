const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sessionRoom = new Schema({
  sessionRoomId: String,
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

const SessionRoom = mongoose.model("sessionroom", sessionRoom);

const UserInSession = require("../models/userInRoom");

async function removeUserSessionRoom({ sessionRoomId, id }) {
  const data = await SessionRoom.updateOne(
    {
      sessionRoomId,
    },
    {
      $pull: {
        connectedUsers: { socketId: id },
      },
    },
  );
  return data;
}

async function removeSessionRoomFromUser({ id, sessionRoomId }) {
  const data = await UserInSession.findOneAndUpdate(
    {
      userId: id,
    },
    {
      $pull: {
        sessionRoom: { sessionRoomId },
      },
    },
    { new: true },
  );

  return data;
}

async function addUserToSessionRoom({
  userId,
  sessionRoomId,
  socketId,
  username,
}) {
  const roomExist = await SessionRoom.findOne({
    sessionRoomId,
  });

  if (!roomExist) {
    await SessionRoom.create({
      sessionRoomId,
      connectedUsers: [],
    });
  }

  const { connectedUsers } = await SessionRoom.findOneAndUpdate(
    { sessionRoomId },
    {
      $push: {
        connectedUsers: {
          userId,
          socketId,
          username,
        },
      },
    },
    { new: true },
  );

  return connectedUsers;
}

async function addRoomToUser({ userId, sessionRoomId }) {
  const exist = await UserInSession.findOne({
    userId,
  });
  if (!exist) {
    await UserInSession.create({
      userId,
      sessionRoom: [],
    });
  }
  const conectedUser = { sessionRoomId };
  const data = await UserInSession.updateOne(
    {
      userId,
    },
    {
      $push: {
        sessionRoom: conectedUser,
      },
    },
  );

  return data;
}

async function start() {
  await SessionRoom.deleteMany({});
  await UserInSession.deleteMany({});
}

start();

module.exports = {
  addUserToSessionRoom,
  addRoomToUser,
  removeUserSessionRoom,
  removeSessionRoomFromUser,
};
