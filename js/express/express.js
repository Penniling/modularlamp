module.exports = (appExpress) => {
    appExpress.use((req, res, next) => {
        console.log(req.socket.remoteAddress)
        if (/192.168.(\d+)?.(\d+)?(:\d+)?\/?/.test(req.socket.remoteAddress)) {
            next();
        } else {
            res.status(401);
            res.end();
        }
        });
    appExpress.use((req, res, next) => {
        req.setEncoding('utf8');
        req.rawBody = '';
        req.on('data', function(chunk) {
          req.rawBody += chunk;
        });
        req.on('end', function(){
          next();
        });
      })
}