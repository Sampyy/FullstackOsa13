require("dotenv").config()
const { Sequelize, QueryTypes, Model, DataTypes } = require("sequelize")
const express = require("express")
const app = express()
app.use(express.json())
const sequelize = new Sequelize(process.env.DATABASE_URL)

class Blog extends Model {}
Blog.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    author: { type: DataTypes.TEXT },
    url: { type: DataTypes.TEXT, allowNull: false },
    title: { type: DataTypes.TEXT, allowNull: false },
    likes: { type: DataTypes.INTEGER, defaultValue: 0 }
  },
  { sequelize, underscored: true, timestamps: false, modelName: "blog" }
)
Blog.sync()

app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await Blog.findAll()
    return res.json(blogs)
  } catch (e) {
    return res.status(400).json({ e })
  }
})

app.post("/api/blogs", async (req, res) => {
  try {
    console.log(req.body)
    const blog = await Blog.create(req.body)
    return res.json(blog)
  } catch (e) {
    return res.status(400).json({ e })
  }
})

app.delete("/api/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id)
    blog.destroy()
    return res.status(204).end()
  } catch (e) {
    return res.status(404).json({ e })
  }
})

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
  console.log("Listening to ", PORT)
})
