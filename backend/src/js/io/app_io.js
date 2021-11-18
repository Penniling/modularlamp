module.exports = (appIO, lampIO, con) => {
  appIO.use((socket, next) => {
    var token = socket.request._query.token
    console.log(socket.request._query.token)
    console.log(checkAuthToken(token, con))
    next()
  })
}

function checkAuthToken(token, con) {
  con.query("SELECT `name` FROM `Users` WHERE tokens=?", [token], (error, results, fields) => {
    if (error) return false;
    console.log(results)
    return true;
})
}
