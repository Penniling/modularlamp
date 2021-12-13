const bcrypt = require("bcrypt")

module.exports = (appIO, lampIO, con) => {
  appIO.use((socket, next) => {
    var creds = JSON.parse(socket.request._query.creds)
    console.log(creds)
    if (validateCreds(creds))
    next()
  })

  async function validateCreds(creds) {
    return new Promise((resolve, reject) => {
      con.query("SELECT * FROM Users WHERE NAME=? AND PASSWORD=?", [creds.usr, creds.pwd], (error, result, fields) => {
        if(error) console.loag(error) && reject(error)
        
        if(result[0]?.name === creds.usr) {
          resolve(creds.usr)
        }else {
          reject()
        }
      })
    })
  }
}
