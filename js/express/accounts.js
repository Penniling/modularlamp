module.exports = (app, con) => {
    const bcrypt = require("bcrypt")
    app.post("/register", (req, res) => {
        console.log(req.body)
        if (req.body.key != "abc") {res.status(401); res.end(); return}
        const salt = bcrypt.genSaltSync(parseInt(process.env.salts))
        con.query('INSERT INTO `Users`(`name`, `password`, `tokens`) VALUES(?, ?, "[]")', [req.body.usr, bcrypt.hashSync(unescape(encodeURIComponent("abc")), salt)], (error, results, fields) => {
            if(error) throw error;
            res.end()
        })
    })
}
