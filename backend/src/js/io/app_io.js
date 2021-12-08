module.exports = (appIO, lampIO, con) => {
  appIO.use((socket, next) => {
    var token = socket.request._query.creds
    console.log(socket.request._query.creds)
    next()
  })
}
