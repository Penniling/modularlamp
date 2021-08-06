module.exports = (app, con) => {
    app.post("/register", (req, res) => {
        console.log(req.body)
        if (req.body.key != "abc") {res.status(401); res.end(); return}
        con.query('INSERT INTO `Users`(`name`, `password`, `tokens`) VALUES(?, ?, [])', (req.body.usr, bcrypt.hashSync(req.body.pwd, process.env.salts)), (error, results, fields) => {
            if(error) throw error;
            res.end()
        })
    })
}
