logger = require('./logger')

const errorHandler = (error, req, res, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).json({error: "Malformatted ID"})
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({error: error.message})
  }

  next(error)
}

module.exports = {
  errorHandler
}