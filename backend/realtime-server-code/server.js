const express = require("express");
const mongoose = require("mongoose");
const {
  coadingboardMannager,
} = require("./applicationMannager/CoadingboardMannager");
require("dotenv").config();
const backgroundJob = require("./cron/backgrongJob");
mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const app = express();
const cors = require("cors");
app.use(cors());
const UserInRoom = require("./models/userInRoom");
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const currentUiVersion = "1.1";
app.get("/", function (req, res) {
  res.send("heelo");
});
io.use((socket, next) => {
  const userId = socket.handshake.auth.userId;
  if (!userId) {
    return next(new Error("not connected"));
  }
  socket.userId = userId;
  next();
});
const {
  addUserToSessionRoom,
  addRoomToUser,
  removeUserSessionRoom,
  removeSessionRoomFromUser,
} = require("./applicationMannager/SessionRoom");

const onConnection = (socket) => {
  socket.emit("welcome:connect", { userId: socket.userId });
  socket.on("join:board:room", async ({ boardId }) => {
    const stateBuffer = await coadingboardMannager.joinBoad(boardId);
    socket.emit("sync:board:room", stateBuffer);
    socket.join(boardId);
  });
  // Listen for updates from the client
  socket.on("update:board:room", async ({ boardId, update, userId }) => {
    const stateBuffer = await coadingboardMannager.updateBoard({
      boardId,
      update,
      userId,
    });
    socket
      .to(boardId)
      .emit("updated:board:room", { update: stateBuffer, boardId });
  });

  //send a bunch of event there
  socket.on("codeWorkSession:event", async (payload) => {
    const { workSessionId } = payload;
    socket.broadcast
      .to(workSessionId)
      .emit("codeWorkSession:event:update", payload);
  });

  socket.on("update:cursor", async ({ boardId, update }) => {
    socket.broadcast.to(boardId).emit("updated:cursor", { boardId, update });
  });

  socket.on(
    "join:project:room",
    async ({ sessionRoomId, userId, username }) => {
      const socketId = socket.id;
      const allUserInSessionRoom = await addUserToSessionRoom({
        userId,
        username,
        sessionRoomId,
        socketId,
      });
      await addRoomToUser({
        userId: socketId,
        sessionRoomId,
      });
      socket.join(sessionRoomId);

      io.to(sessionRoomId).emit("user:join:project", {
        userId,
        allUserInSessionRoom,
      });
    }
  );

  joinRoom = async () => {
    this.server.auth = { userId: this.userId };
    await this.server.connect();
    this.server.emit("join:project:room", {
      projectId: this.projectId,
      userId: this.userId,
    });
  };

  socket.on("leave-room", async (meetingRoomSessionId) => {
    socket.leave(meetingRoomSessionId);
    const socketId = socket.id;
    //do something here
  });

  socket.on("leave:session:room", async (sessionRoomId) => {
    socket.leave(sessionRoomId);
    const socketId = socket.id;
    await removeSessionRoomFromUser({
      id: socketId,
      sessionRoomId,
    });

    await removeUserSessionRoom({
      sessionRoomId,
      id: socketId,
    });

    io.to(sessionRoomId).emit("leaved:session:room", {
      id: socketId,
      sessionRoomId,
    });
  });

  socket.on("disconnect", async () => {
    const socketId = socket.id;
    const sessionRoomConnectedToUser = await UserInRoom.findOne({
      userId: socketId,
    });
    if (!sessionRoomConnectedToUser) {
      return;
    }

    for (const { sessionRoomId } of sessionRoomConnectedToUser.sessionRoom) {
      await removeUserSessionRoom({
        sessionRoomId,
        id: socketId,
      });
      socket.broadcast
        .to(sessionRoomId)
        .emit("leaved:session:room", { id: socketId, sessionRoomId });
    }
    await UserInRoom.deleteOne({
      userId: socketId,
    });
  });
};

io.on("connection", onConnection);
backgroundJob();
server.listen(process.env.PORT);
