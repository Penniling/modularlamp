module.exports = (appIO, lampIO, con) => {
  appIO.use((socket, next) => {
    console.log(socket.request)
    next()
  })
}

function checkAuthToken(token, con) {
  con.query('SELECT NAME FROM Users WHERE tokens="?"', [token], (error, results, fields) => {
    if (error) return false;
    console.log(results)
    return true;
})
}