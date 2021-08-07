module.exports = (app, con) => {
    const Math = require("math")
    const bcrypt = require("bcrypt")

    app.post("/login", (req, res) => {
        validateCred(req.body).then((valid) => {
            if (!valid) {res.status(401); res.end(); return};
            console.log(3)
            token = [...generateToken()].join("");
            con.query('UPDATE `Users`; SET `tokens` = JSON_ARRAY_APPEND(`tokens`, $, CAST(? as JSON)) WHERE `name` = ?;', [{"a": "b"}, req.body.usr], (error, results, fields) => {
                console.log(4)
                if (error) console.log(error)
                res.status(200)
                res.end()
                console.log(5)
            })
        }).catch(() => {
            res.status(500)
            res.end()
        })
      });
    function validateCred(cred) {
        return new Promise((resolve, reject) => {
            con.query('SELECT `password` FROM `Users` WHERE `name`=?', [cred.usr,], (error, results, fields) => {
                if (error) reject();
                console.log(1)
                resolve(bcrypt.compareSync(cred.pwd, results[0]["password"]))
                console.log(2)
            })
        })
    }

    function* generateToken() {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_".split("");
        const len = 100;
    
        for(var i = 0; i < len; i++) {
            yield chars[ Math.floor( Math.random() * chars.length ) ];
        }
    
    }
}
