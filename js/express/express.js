module.exports = (app, express) => {
    app.use(express.json())
    app.use((req, res, next) => {
    if (/(https?:\/\/)?192.168.(\d+)?.(\d+)?(:\d+)?\/?/.test(req.origin)) {
        next();
    } else {
        res.status(401);
        res.end();
    }
    });
}