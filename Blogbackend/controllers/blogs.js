const router = require("express").Router()
const jwt = require("jsonwebtoken")
const { Blog, User } = require("../models")
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

router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      attributes: { exclude: ['userId'] },
      include: {
        model: User,
        attributes:['name', 'username']
      }
    })
    return res.json(blogs)
  } catch (e) {
    return res.status(400).json({ e })
  }
})

router.post("/", tokenExtractor, async (req, res, next) => {
  try {
    console.log(req.body)
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({ ...req.body, userId: user.id })
    return res.json(blog)
  } catch (e) {
    next(e)
  }
})

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.put("/:id", blogFinder, async (req, res, next) => {
  try {
    req.blog.likes = req.body.likes
    await req.blog.save()
    return res.json(req.blog).end()
  } catch (e) {
    next(e)
  }
})

router.delete("/:id", tokenExtractor, blogFinder, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    if (req.blog.userId === user.id) {
      await req.blog.destroy()
      return res.status(204).end()
    }
    if (req.blog) {
      const error = new Error()
      error.name = "NotBlogsOwnerError"
      throw error
    }
  } catch (e) {
    next(e)
  }
})

module.exports = router
