module.exports = (appIO, lampIO, con) => {
  appIO.use((socket, next) => {
    var creds = JSON.parse(socket.request._query.creds)
    console.log(creds)
    if (validateCreds(creds))
    next()
  })

  async function validateCreds(creds) {
    con.query('SELECT name FROM Users WHERE NAME=? AND PASSWORD=?', [creds.usr, creds.pwd], (error, results, fields) => {
      console.log(results[0]["name"])
      if (results[0]["name"]) {
          return 
      }
    }
}
