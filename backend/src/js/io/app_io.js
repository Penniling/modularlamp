module.exports = (appIO, lampIO, con) => {
  io.use(function(socket, next) {
    var token = socket.request.query.token;
    console.log(token)
    if (checkAuthToken(token)) {
      next();
    }
  });
}

function checkAuthToken(token) {
  con.query('SELECT NAME FROM Users WHERE tokens="?"', [token], (error, results, fields) => {
    if (error) return false;
    console.log(results)
    return true;
})
}