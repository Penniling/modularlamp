module.exports = (appIO, lampIO) => {
  appIO.use(function(socket, next) {
    next();
  })
}