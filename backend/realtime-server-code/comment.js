module.exports = (io, socket) => {
  socket.on("comment:sent", (comment) => {
    io.emit("comment:receive", comment);
  });
};
