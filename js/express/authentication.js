module.exports = (app, con) => {
    const Math = require("Math")

    app.post("/login", (req, res) => {
        if (!validateCred(req.body)) {res.status(402); res.end(); return};
        token = [...generateToken()].join("");
        con.query('INSERT INTO `User` (name, password, token) VALUES(abc, abc, abc)')
      });
    function validateCred(cred) {
        if (cred.usr == "test" && cred.pwd == "1234") return true;
    }

    function* generateToken() {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_".split("");
        const len = 100;
    
        for(var i = 0; i < len; i++) {
            yield chars[ Math.floor( Math.random() * chars.length ) ];
        }
    
    }
}
