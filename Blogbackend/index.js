const { PORT } = require("./util/config")
const express = require("express")
const app = express()
app.use(express.json())
const { connectToDb } = require("./util/db")
const blogsRouter = require("./controllers/blogs")
const usersRouter = require("./controllers/users")
const loginRouter = require('./controllers/login')

const errorHandler = require("./util/error")

app.use("/api/blogs", blogsRouter)
app.use("/api/users", usersRouter)
app.use('/api/login', loginRouter)

app.use(errorHandler)

const start = async () => {
  await connectToDb()
  app.listen(PORT, () => {
    console.log("Listening to ", PORT)
  })
}
start()
