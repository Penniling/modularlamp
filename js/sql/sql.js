module.exports = (con) => {
    con.connect((err) => {
        if (err) cosole.log(err);
        console.log("Connected to server")
    })
}