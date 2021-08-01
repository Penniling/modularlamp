const socketio = require("socket.io");
const express = require("express");
const mysql = require("mysql");
const http = require("http");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

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
con.query('UPDATE `lamp`.`Users` SET `tokens`="moin" WHERE `name`="penniling" AND `password`=1234')

require("./js/express/authentication")(app, con);
require("./js/express/express")(app, express);
require("./js/sql/sql")(con);
require("./js/io/io")(io);

server.listen(3000, "192.168.2.135");