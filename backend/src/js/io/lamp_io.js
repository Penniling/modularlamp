module.exports = (lampIO) => {
  lampIO.on("connection", (socket) => {
    console.info(`Lamp connected [id=${socket.id}]`);
    socket.emit("hello", "moin");
    socket.on("data", (_) => {
      console.log(_);
    })
    socket.on("disconnect", () => {
      console.info(`Lamp gone [id=${socket.id}]`);
      clearInterval(x);
    });
  });
}
