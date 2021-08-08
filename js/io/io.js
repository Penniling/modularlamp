module.exports = (io) => {
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if(token == "abc") {
      next()
    }
  })
    io.on("connection", (socket) => {
        console.info(`Client connected [id=${socket.id}]`);
        socket.emit("hello", "moin");
        socket.on("data", (_) => {
          console.log(_);
        });
        socket.on("disconnect", () => {
          console.info(`Client gone [id=${socket.id}]`);
        });
      });
}