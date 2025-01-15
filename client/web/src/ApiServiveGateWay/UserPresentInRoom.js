import realtimeBoardSocket from "realtimeBoardSocket";
class UserPresentInRoom {
  constructor({ projectId, userId, username }) {
    this.sessionRoomId = projectId;
    this.userId = userId;
    this.username = username;
    this.server = realtimeBoardSocket;
    this.socketId = this.server.id;
  }

  event = () => {
    // this.server.on("user:join:project", (data) => {});
  };

  joinRoom = async () => {
    // this.server.auth = { userId: this.userId };
    // await this.server.connect();
    this.server.emit("join:project:room", {
      sessionRoomId: this.sessionRoomId,
      userId: this.userId,
      username: this.username,
    });
  };
  leaveRoom = () => {
    this.server.emit("leave:session:room", this.sessionRoomId);
    this.server.off("user-disconnected");
  };
}

export default UserPresentInRoom;
