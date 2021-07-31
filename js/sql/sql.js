module.exports = (con) => {
    con.connect((err) => {
        if (err) console.log(err);
        console.log("Connected to server")
    })
}