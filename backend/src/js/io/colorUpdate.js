module.exports = (appIO, lampIO) => {
    appIO.on("connection", (socket) => {
        console.info(`Client connected [id=${socket.handshake.address}] to App io`)
        socket.emit("hello", "moin");
        socket.on("updateLamp", (lamp) => {
          console.log(lamp)
          if(isValid(lamp)) {
            var parsedLamp = JSON.parse(lamp);
            setTimeout(() => {
              lampIO.emit(parsedLamp["color"])
            }, parsedLamp["delay"]*1000)
          }
        })
        socket.on("disconnect", () => {
          console.info(`Client gone [id=${socket.id}]`);
        })
      })

  function isValid(lamp) {
    return true;
  }
}
