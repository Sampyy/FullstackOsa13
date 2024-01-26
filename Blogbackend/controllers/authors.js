const router = require("express").Router()
const { Blog } = require("../models")
const { sequelize } = require("../util/db")

router.get("/", async (req, res, next) => {
  try {
    const authors = await Blog.findAll({
        group: "author",
        attributes: [
            'author',
            [sequelize.fn('COUNT', sequelize.col('blog')), 'articles'],
            [sequelize.fn('SUM', sequelize.col('likes')), 'likes']
        ],
        order: [sequelize.fn('SUM', sequelize.col('likes')), 'likes']
    })
    res.json(authors)
  } catch (e) {
    next(e)
  }
})

module.exports = router
