module.exports = (lampIO) => {

  function lampUpdater(socket) {
    var n = 0
    while(true) {
      setTimeout(() => {
        socket.emit("Hello " + n)
        n++
      }, 5000)
    }
  }

  lampIO.on("connection", (socket) => {
    console.info(`Lamp connected [id=${socket.id}]`);
    socket.emit("hello", "moin");
    lampUpdater(socket)
    socket.on("disconnect", () => {
      console.info(`Lamp gone [id=${socket.id}]`);
    });
  });
}