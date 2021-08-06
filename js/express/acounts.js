module.exports = (app, con) => {
    app.post("/register", (req, res) => {
        if (!req.body.key == "abc") {res.status(402); res.end(); return}
        con.query('INSERT INTO `Users`(`name`, `password`) VALUES("'+req.body.usr+'", "'+req.body.pwd+'")', (error, results, fields) => {
            if(error) throw error;
            res.end()
        })
    })
}
