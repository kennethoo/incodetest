module.exports = (io, socket) => {
  socket.on("new-message", (data) => {
    io.to(data.friend).to(data.sender).emit("your-new-message", data);
  });

  socket.on("new-message-to-group", (data) => {
    data.members.forEach((item) => {
      io.to(item.userId).emit("group-new-message", data.content);
    });
  });

  socket.on("new-message-to-chat", (data) => {
    io.to(data.room).emit("new-sms", data);
  });
};
