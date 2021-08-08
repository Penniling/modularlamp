module.exports = (app, express) => {
    const cors = require("cors")
    app.use(cors({
        origin: "*",
    }))
    app.use((req, res, next) => {
        console.log(req.socket.remoteAddress)
        if (/192.168.(\d+)?.(\d+)?(:\d+)?\/?/.test(req.socket.remoteAddress)) {
            next();
        } else {
            res.status(401);
            res.end();
        }
        });
}