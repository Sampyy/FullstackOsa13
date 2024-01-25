const router = require("express").Router()
const { Blog } = require("../models")

router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.findAll()
    return res.json(blogs)
  } catch (e) {
    return res.status(400).json({ e })
  }
})

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body)
    const blog = await Blog.create(req.body)
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

router.delete("/:id", blogFinder, async (req, res, next) => {
  try {
    await req.blog.destroy()
    return res.status(204).end()
  } catch (e) {
    next(e)
  }
})

module.exports = router
