module.exports = (appExpress) => {
  appExpress.use(function(socket, next) {
    var handshakeData = socket.request;
    console.log("middleware:", handshakeData._query["auth"]);
    next();
  });
  appExpress.on("connection", (socket) => {
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