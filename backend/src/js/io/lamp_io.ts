module.exports = (lampIO) => {
  lampIO.on("connection", (socket) => {
    socket.emit("hello", "moin");
    socket.on("data", (_) => {
      console.log(_);
    })
    socket.on("disconnect", () => {
      clearInterval(x);
    });
  });
}
