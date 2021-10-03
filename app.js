const bodyParser = require('body-parser')
const socketio = require("socket.io");
const express = require("express");
const mysql = require("mysql");
const http = require("http");
require("dotenv").config();

function createAppServer() {
  const app = express();
  const server = http.createServer(app);
  app.use(bodyParser.json())
  
  const io = socketio(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "OPTIONS", "DELETE", "PUT"],
    },
  });

  server.listen(80, "192.168.2.135"); 
  
  return [io, app];
}

function createLampServer() {
  const app = express();
  const server = http.createServer(app);
  app.use(bodyParser.json())
  
  const io = socketio(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "OPTIONS", "DELETE", "PUT"],
    },
  });
  
  server.listen(8080, "192.168.2.135"); 
  
  return [io, app];
}

const [appIO, appExpress] = createAppServer();
const [lampIO, lampExpress] = createLampServer();

lampIO.on("connection", (socket) => {
  socket.emit("reply", "Hello Esp from Raspberry Pi");
})

const con = mysql.createConnection({
    host: "localhost",
    user: "lamp",
    password: process.env.mysqlPwd, 
    database: "lamp"
    
})

require("./js/express/authentication")(appExpress, con);
require("./js/express/accounts")(appExpress, con);
require("./js/express/express")(appExpress);
require("./js/io/app_io")(appIO);
require("./js/sql/sql")(con);