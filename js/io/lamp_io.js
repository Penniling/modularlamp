module.exports = (lampIO) => {
  lampIO.on("connection", (socket) => {
    console.info(`Lamp connected [id=${socket.id}]`);
    socket.emit("hello", "moin");
    var i = 0;
    var x = setInterval(() => {while(true) {socket.emit("number", i)}; i++}, 1000)
    socket.on("disconnect", () => {
      console.info(`Lamp gone [id=${socket.id}]`);
      clearInterval(x);
    });
  });
}