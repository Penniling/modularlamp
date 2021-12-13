module.exports = (appIO, lampIO, con) => {
  appIO.use((socket, next) => {
    var creds = socket.request._query.creds
    console.log(creds)
    validateCreds(creds)
    next()
  })

  function validateCreds(creds) {
    con.query('SELECT name FROM Users WHERE NAME="?" AND PASSWORD="?', [creds.usr, creds.pwd], (error, results, fields) => {
      if (error) console.log(error)
      console.log(results)
    })
    }
    return
}
