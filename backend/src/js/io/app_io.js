module.exports = (appIO, lampIO, con) => {
  appIO.use(function(socket, next) {
    next()
    var token = socket.request.query.token;
    console.log(token)
    if (checkAuthToken(token, con)) {
      next();
    }
  });
}

function checkAuthToken(token, con) {
  con.query('SELECT NAME FROM Users WHERE tokens="?"', [token], (error, results, fields) => {
    if (error) return false;
    console.log(results)
    return true;
})
}