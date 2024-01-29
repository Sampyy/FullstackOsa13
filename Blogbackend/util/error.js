const errorHandler = (error, request, response, next) => {
  console.error(error)
  console.log(error.name)
  if (error.name === "TypeError") {
    console.log("In TypeError")
    return response.status(400).send({ error: error.message })
  }
  if (error.name === "SequelizeValidationError") {
    console.log("In SequelizeValidationError")
    return response
      .status(400)
      .send({ error: error.errors.map((item) => item.message) })
  }
  if (error.name === "SequelizeDatabaseError") {
    console.log("In SequelizeDatabaseError")
    return response.status(400).send({ error: error.message })
  }
  if (error.name === "SequelizeUniqueConstraintError") {
    console.log("In SequelizeUniqueConstraintError")
    return response
      .status(400)
      .send({ error: error.errors.map((item) => item.message) })
  }
  if (error.name === "UsernamePasswordIncorrect") {
    console.log("In UsernamePasswordIncorrect")
    return response
      .status(400)
      .send({ error: "Username or password incorrect" })
  }
  if (error.name === "MissingLoginToken") {
    console.log("In MissingLoginToken")
    return response.status(400).send({ error: "Missing login token" })
  }
  if (error.name === "NotBlogsOwnerError") {
    console.log("In NotBlogsOwnerError")
    return response.status(400).send({ error: "Not the owner of the blog" })
  }
  if (error.name === "JsonWebTokenError") {
    console.log("In JsonWebTokenError")
    return response.status(403).send({ error: "Incorrect token" })
  }
  if (error.name === "IncorrectUserError") {
    console.log("In IncorrectUserError")
    return response
      .status(403)
      .send({ error: "Logged in user is not the owner of the resource" })
  }
  if (error.name === "ExpiredLoginToken") {
    console.log("In ExpiredLoginToken")
    return response
      .status(403)
      .send({ error: "Expired login token, please relog" })
  }

  next(error)
}

module.exports = errorHandler
