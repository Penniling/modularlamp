module.exports = (appIO, lampIO) => {
  appIO.use(function(socket, next) {
    var handshakeData = socket.request;
    console.log("middleware:", handshakeData._query["auth"]);
    next();
  })
}