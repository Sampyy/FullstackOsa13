require("dotenv").config()
const { Sequelize, Model, DataTypes } = require("sequelize")
const express = require("express")
const app = express()
console.log("yesoajeorjh", process.env.DATABASE_URL)
const sequelize = new Sequelize(process.env.DATABASE_URL)

//
//postgres service by default uses same port, use diff port on docker, ALTER ROLE postgres WITH PASSWORD 'your_password';

class Note extends Model {}
Note.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    content: { type: DataTypes.TEXT, allowNull: false },
    important: { type: DataTypes.BOOLEAN },
    date: { type: DataTypes.DATE }
  },
  { sequelize, underscored: true, timestamps: false, modelName: "note" }
)
Note.sync()

app.get("/api/notes", async (req, res) => {
  const notes = await Note.findAll()
  res.json(notes)
})

app.get("/api/notes/:id", async (req, res) => {
  const note = await Note.findByPk(req.params.id)
  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})

app.put("/api/notes/:id", async (req, res) => {
  const note = await Note.findByPk(req.params.id)
  if (note) {
    note.important = req.body.important
    await note.save()
    res.json(note)
  } else {
    res.status(404).end()
  }
})

app.post("/api/notes", async (req, res) => {
  try {
    const note = await Note.create(req.body)
    return res.json(note)
  } catch (e) {
    return res.status(400).json({ e })
  }
})

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
  console.log("server listening to ", PORT)
})