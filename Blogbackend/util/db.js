const Sequelize = require("sequelize")
const { DATABASE_URL } = require("./config")

const sequelize = new Sequelize(process.env.DATABASE_URL)

const connectToDb = async () => {
  try {
    await sequelize.authenticate()
    console.log("Connected to database at :", DATABASE_URL)
  } catch (e) {
    console.log("Error while connecting to database: ", e)
    return process.exit(1)
  }
  return null
}

module.exports = { connectToDb, sequelize }
