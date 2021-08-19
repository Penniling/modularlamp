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
        console.log(req.params)
        console.log(req.headers)
        console.log(req.body)
        console.log(req.query)
    })
}