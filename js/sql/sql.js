module.exports = (con) => {
    con.connect((err) => {
        if (err) console.log(err);
        console.log("Connected to server")
        con.query(`UPDATE 'lamp'.'Users' SET 'tokens'="${Math.random}" WHERE 'name'="${"test"}" AND 'password'=${1234}`)
    })
}