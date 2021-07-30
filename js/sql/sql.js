module.exports = (con) => {
    con.connect((err) => {
        if (err) throw err;
        console.log("Connected to server")
    })
}