module.exports = (app, con) => {
    const math = require("math")
    
    app.post("/login", (req, res) => {
        
        if (!validateCred(req.body)) {res.status(402); res.end(); return};
        token = [...generateToken()].join("");

      });
    function validateCred(cred) {}

    function* generateToken() {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_".split("");
        const len = 100;
    
        for(var i = 0; i < len; i++) {
            yield chars[ Math.floor( Math.random() * chars.length ) ];
        }
    
    }
}
