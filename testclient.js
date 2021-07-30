const io = require("socket.io-client");
const ioClient = io.connect("http://192.168.2.212:3000");

ioClient.on("hello", (msg) => console.info(msg));
