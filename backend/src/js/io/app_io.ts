import bcrypt from "bcrypt"

export default (appIO, lampIO, con) => {
  appIO.use(async (socket, next) => {
    next()
  })
}
