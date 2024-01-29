const { Model, DataTypes } = require("sequelize")
const { sequelize } = require("../util/db")

class BlogReadinglist extends Model {}
BlogReadinglist.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    readinglistId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "readinglists", key: "id" }
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "blogs", key: "id" }
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "blog_readinglists"
  }
)

module.exports = BlogReadinglist
