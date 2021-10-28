module.exports = (appIO, lampIO) => {
    appIO.on("connection", (socket) => {
        console.info(`Client connected [id=${socket.id}] to App io`);
        socket.emit("hello", "moin");
        socket.on("updateLamp", (lamp) => {
          console.log(lamp)
          if(isValid(lamp)) {

          }
        })
        socket.on("disconnect", () => {
          console.info(`Client gone [id=${socket.id}]`);
        })
      })

  function isValid(lamp) {
    
  }
  }