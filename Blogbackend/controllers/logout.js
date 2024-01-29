const { tokenExtractor } = require("../util/middleware")
const { Session } = require("../models")

const router = require("express").Router()

router.delete("/", tokenExtractor, async (req, res, next) => {
  try {
    const session = await Session.findByPk(req.token)
    //console.log(session)
      session.destroy()
      res.send('Logged out')
  } catch (e) {
    next(e)
  }
})

module.exports = router
