const { DataTypes } = require("sequelize")

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("users", "disabled", {
      type: DataTypes.BOOLEAN,
      default: false
    })
    await queryInterface.createTable("sessions", {
      token: {
        type: DataTypes.TEXT,
        allowNull: false,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" }
      },
      created_at: { type: DataTypes.DATE },
      updated_at: { type: DataTypes.DATE }
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("sessions")
    await queryInterface.removeColumn("users", "disabled")
  }
}
