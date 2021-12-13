module.exports = (appIO, lampIO, con) => {
  appIO.use((socket, next) => {
    var creds = socket.request._query.creds
    console.log(socket.request._query.creds)
    next()
  })

  function validateCreds(creds) {
    con.query('', (error, results, fields) => {

    })
    }

}
