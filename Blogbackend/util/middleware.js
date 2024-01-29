const jwt = require("jsonwebtoken")
const { SECRET } = require("../util/config")

const tokenExtractor = (req, res, next) => {
    const auth = req.get("authorization")
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      try {
        req.decodedToken = jwt.verify(auth.substring(7), SECRET)
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
  
module.exports = {tokenExtractor}