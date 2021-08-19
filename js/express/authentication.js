const { json } = require("body-parser");

module.exports = (appIO, con) => {
    const Math = require("math")
    const bcrypt = require("bcrypt")

    appIO.post("/login", (req, res) => {
        console.log(req.body)
        validateCred(req.body).then((valid) => {
            if (!valid) {res.status(401); res.end(); return};
            token = [...generateToken()].join("");
            con.query('UPDATE `Users` SET `tokens` = JSON_ARRAY_APPEND(`tokens`, "$", ?) WHERE `name` = ?', [token, req.body.usr], (error, results, fields) => {
                if (error) console.log(error)
                res.status(200)
                res.send(token)
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
                console.log(results)
                resolve(bcrypt.compareSync(cred.pwd, results[0]["password"]))
            })
        })
    }

    function* generateToken() {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_".split("");
        const len = 500;
    
        for(var i = 0; i < len; i++) {
            yield chars[ Math.floor( Math.random() * chars.length ) ];
        }
    
    }
}
