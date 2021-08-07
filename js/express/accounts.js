module.exports = (app, con) => {
    const bcrypt = require("bcrypt")
    app.post("/register", (req, res) => {
        console.log(req.body)
        if (req.body.key != "abc") {res.status(401); res.end(); return}
        con.query('INSERT INTO `Users`(`name`, `password`, `tokens`) VALUES("?", "?", [])', (req.body.usr, bcrypt.hashSync(unescape(encodeURIComponent(["abc"])), 12)), (error, results, fields) => {
            if(error) throw error;
            res.end()
        })
    })
}
