const jwt = require("jsonwebtoken")
const { SECRET } = require("../util/config")
const { Session } = require("../models")

const tokenExtractor = async (req, res, next) => {
  const auth = req.get("authorization")
  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    reqToken = auth.substring(7)
    where = { token: reqToken }
    const session = await Session.findOne({
      where: { token: reqToken }
    })
    //console.log("session token: ", session.token)
    if (!session) {
      const error = new Error()
      error.name = "ExpiredLoginToken"
      next(error)
    }
    try {
      req.decodedToken = jwt.verify(reqToken, SECRET)
      req.token = session.token
    } catch (e) {
      next(e)
    }
  } else {
    const error = new Error()
    error.name = "MissingLoginToken"
    next(error)
  }
  next()
}

module.exports = { tokenExtractor }
