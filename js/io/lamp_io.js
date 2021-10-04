module.exports = (lampIO) => {
    lampIO.on("connection", (socket) => {
          console.info(`Client connected [id=${socket.id}] to Lamp IO`);
          socket.emit("hello", "moin");
          socket.on("data", (_) => {
            console.log(_);
          });
          socket.on("disconnect", () => {
            console.info(`Client gone [id=${socket.id}]`);
          });
        });
}