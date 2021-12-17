import bcrypt from "bcrypt"

export default (appIO, lampIO, con) => {
  appIO.use(async (socket, next) => {
    var creds = JSON.parse(socket.request._query.creds)
    
    if(await validateCreds(creds)) {

    }
    next()
  })

  async function validateCreds(creds) {
    return new Promise((resolve, reject) => {
      con.query("SELECT PASSWORD FROM Users WHERE NAME=?", [creds.usr], (error, result, fields) => {
        if(error || result?.length === 0) {
          console.log(error)
          reject(error)
        }
        var oldHash = bcrypt.hash(result[0].password, 10)
        console.log(oldHash)
        if(result[0]?.password === creds.usr) {
          resolve(creds.usr)
        }else {
          reject()
        }
      })
    })
  }
}
