module.exports = (io, socket) => {
  socket.on("run-that-conversation", (data) => {
    data.forEach((item) => {
      io.to(item).emit("new-coversation-or-message", data);
    });
  });

  socket.on("check-thatlogind", (room) => {
    io.to(room).emit("check-everone-login-activity");
  });
};
