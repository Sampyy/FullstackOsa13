require("dotenv").config()
const { Sequelize, QueryTypes } = require("sequelize")
const sequelize = new Sequelize(process.env.DATABASE_URL)

const main = async () => {
    try {
      const blogs = await sequelize.query("SELECT * FROM blogs", {
        type: QueryTypes.SELECT
      })
      console.log(blogs)
    } catch (e) {
      console.log("Error: ", e)
    }
  }
  
  main()