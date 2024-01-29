const Blog = require("./blog")
const User = require("./user")
const Readinglist = require("./readinglist")
const BlogReadinglist = require("./blogReadinglist")

User.hasMany(Blog)
Blog.belongsTo(User)

Readinglist.belongsTo(User)
User.hasOne(Readinglist)

Blog.belongsToMany(Readinglist, {
  through: BlogReadinglist, as: 'reading'
})
Readinglist.belongsToMany(Blog, {
  through: BlogReadinglist, as: 'readings'
})

module.exports = {
  Blog,
  User,
  Readinglist,
  BlogReadinglist
}
