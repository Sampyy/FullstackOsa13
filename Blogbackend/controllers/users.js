const router = require("express").Router()
const { User, Blog, Readinglist } = require("../models")

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["blogId"] },
      include: {
        model: Blog,
        attributes: ["url", "title", "author"]
      }
    })
    return res.json(users)
  } catch (e) {
    next(e)
  }
})

router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["blogId"] },
      include: [
        {
          model: Blog,
          attributes: ["url", "title", "author"]
        },
        {
          model: Readinglist,
          attributes: ['id', 'user_id'],
          include: {
            model: Blog,
            through: {
              attributes: ['read', 'id']
            },
            as: 'readings'
          }
        }
      ]
    })
    return res.json(user)
  } catch (e) {
    next(e)
  }
})

router.post("/", async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    return res.json(user)
  } catch (e) {
    next(e)
  }
})

router.put("/:username", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { username: req.params.username }
    })
    user.username = req.body.username
    await user.save()
    return res.json(user).end()
  } catch (e) {
    next(e)
  }
})

module.exports = router
