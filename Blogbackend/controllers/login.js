const jwt = require("jsonwebtoken")
const router = require("express").Router()

const { SECRET } = require("../util/config")
const { User, Session } = require("../models")

router.post("/", async (req, res, next) => {
  const user = await User.findOne({
    where: {
      username: req.body.username
    }
  })
  const passwordCorrect = req.body.password === "secret"
  if (!(user && passwordCorrect)) {
    error = new Error()
    error.name = "UsernamePasswordIncorrect"
    return next(error)
  }

  const userForToken = {
    username: user.username,
    id: user.id
  }

  const token = jwt.sign(userForToken, SECRET)
  const session = await Session.create({ userId: user.id, token: token })
  console.log("session login:", session)
  res.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = router
