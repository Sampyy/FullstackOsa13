const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  console.log(error.name)
  if (error.name === "TypeError") {
    console.log("In TypeError")
    return response.status(400).send({ error: error.message })
  }
  if (error.name === "SequelizeValidationError") {
    console.log("In SequelizeValidationError")
    return response.status(400).send({ error: error.message })
  }
  if (error.name === "SequelizeDatabaseError") {
    console.log("In SequelizeDatabaseError")
    return response.status(400).send({ error: error.message })
  }
  next(error)
}

module.exports = errorHandler
