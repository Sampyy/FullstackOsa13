const router = require("express").Router()
const { Readinglist, User, BlogReadinglist, Blog } = require("../models")
const { tokenExtractor } = require("../util/middleware")

router.get("/", async (req, res, next) => {
  try {
    const readinglists = await Readinglist.findAll({
      include: [
        {
          model: User
        },
        {
          model: Blog,
          through: {
            attributes: []
          },
          as: "readings"
        }
      ]
    })
    return res.json(readinglists)
  } catch (e) {
    next(e)
  }
})

router.post("/", async (req, res, next) => {
  try {
    const listAddition = await BlogReadinglist.create(req.body)
    res.json(listAddition)
  } catch (e) {
    next(e)
  }
})

router.put("/:id", tokenExtractor, async (req, res, next) => {
  try {
    const reading = await BlogReadinglist.findByPk(req.params.id)
    const readinglist = await Readinglist.findByPk(reading.readinglistId)
    console.log(req.decodedToken.id)
    if (req.decodedToken.id !== readinglist.userId) {
      const error = new Error()
      error.name = "IncorrectUserError"
      throw error
    }
    reading.read = req.body.read
    await reading.save()
    res.json(reading)
  } catch (e) {
    next(e)
  }
})

module.exports = router
