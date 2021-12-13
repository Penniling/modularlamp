module.exports = (appIO, lampIO) => {
    appIO.on("connection", (socket) => {
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
        })
      })

  function isValid(lamp) {
    return true;
  }
}
