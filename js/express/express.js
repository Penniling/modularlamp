const bodyParser = require("body-parser");

module.exports = (appExpress, express) => {
    appExpress.use((req, res, next) => {
        console.log(req.socket.remoteAddress)
        res.setHeader("Access-Control-Allow-Origin", "*")
        if (/192.168.(\d+)?.(\d+)?(:\d+)?\/?/.test(req.socket.remoteAddress)) {
            next();
        } else {
            res.status(401);
            res.end();
        }
        });
    appExpress.use(bodyParser.json())
}