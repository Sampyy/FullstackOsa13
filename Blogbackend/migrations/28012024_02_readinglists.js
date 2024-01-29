const { DataTypes } = require("sequelize")

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("readinglists", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" }
      },
      created_at: { type: DataTypes.DATE },
      updated_at: { type: DataTypes.DATE }
    })
    await queryInterface.createTable("blog_readinglists", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      readinglist_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "readinglists", key: "id" }
      },
      blog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "blogs", key: "id" }
      },
      read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      created_at: { type: DataTypes.DATE },
      updated_at: { type: DataTypes.DATE }
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("readinglists")
    await queryInterface.dropTable("blog_readinglist")
  }
}
