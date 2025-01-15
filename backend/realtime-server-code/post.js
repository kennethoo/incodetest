module.exports = (io, socket) => {
  socket.on("some-like-a-post", (data) => {
    io.emit("like-this-post", data);
  });

  socket.on("update-the-comment", (data) => {
    io.emit("update-this-comment", data);
  });
};
