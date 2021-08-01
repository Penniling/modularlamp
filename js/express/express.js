module.exports = (app, express) => {
    var bodyParser = require('body-parser')
    app.use(bodyParser.json())
    app.use(express.json())
    app.use((req, res, next) => {
    if (/https?:\/\/192.168.(\d+)?.(\d+)?(:\d+)?\/?/.test(req.origin)) {
        next();
    } else {
        res.status(402);
        res.end();
    }
    });
}