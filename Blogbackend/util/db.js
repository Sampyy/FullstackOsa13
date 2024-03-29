const Sequelize = require("sequelize")
const { DATABASE_URL } = require("./config")
const { Umzug, SequelizeStorage } = require("umzug")

const sequelize = new Sequelize(process.env.DATABASE_URL)

const connectToDb = async () => {
  try {
    await sequelize.authenticate()
    await runMigrations()
    console.log("Connected to database at :", DATABASE_URL)
  } catch (e) {
    console.log("Error while connecting to database: ", e)
    return process.exit(1)
  }
  return null
}

const migrationConf = {
  migrations: {
    glob: "migrations/*.js"
  },
  storage: new SequelizeStorage({
    sequelize,
    tableName: "migrations"
  }),
  context: sequelize.getQueryInterface(),
  logger: console
}

const runMigrations = async () => {
  const migrator = new Umzug(migrationConf)
  const migrations = await migrator.up()
  console.log("Migrations upto date", {
    files: migrations.map((mig) => mig.name)
  })
}

const rollbackMigration = async () => {
  await sequelize.authenticate()
  const migrator = new Umzug(migrationConf)
  await migrator.down()
}

module.exports = { connectToDb, sequelize, rollbackMigration }
