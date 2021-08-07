module.exports = (app, con) => {
    const Math = require("math")
    const bcrypt = require("bcrypt")

    app.post("/login", (req, res) => {
        if (!validateCred(req.body)) {res.status(401); res.end(); return};
        token = [...generateToken()].join("");
        con.query('UPDATE `Users`; SET `tokens` = JSON_ARRAY_APPEND(`tokens`, "$", CAST("?" as JSON)) WHERE `name` = ?;', ({"a": "b"}, req.body.usr), (error, results, fields) => {
            if (error) return
        })
      });
    function validateCred(cred) {
        con.query('SELECT `password` FROM `Users` WHERE `name`=?', (cred.usr), (error, results, fields) => {
            if (error) return false;
            return results[0] == bcrypt.hashSync(cred.pwd, unescape(encodeURIComponent([process.env.salts])))
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
