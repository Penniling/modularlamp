module.exports = (appIO, lampIO, con) => {
  appIO.use((socket, next) => {
    var token = socket.request._query.token
    console.log(socket.request._query.token)
    next()
  })
}
