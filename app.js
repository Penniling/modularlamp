var bodyParser = require('body-parser')
const socketio = require("socket.io");
const express = require("express");
const mysql = require("mysql");
const http = require("http");
require("dotenv").config();

const app = express();
app.use(bodyParser.json())
const server = http.createServer(app);

app.get("/", (req, res) => {
  res.send("hello")
})

const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "OPTIONS", "DELETE", "PUT"],
  },
});

const con = mysql.createConnection({
    host: "localhost",
    user: "lamp",
    password: process.env.mysqlPwd,
    database: "lamp"
    
})

require("./js/express/authentication")(app, con);
require("./js/express/express")(app, express);
require("./js/express/acounts")(app, con);
require("./js/sql/sql")(con);
require("./js/io/io")(io);

server.listen(80, "192.168.2.135");