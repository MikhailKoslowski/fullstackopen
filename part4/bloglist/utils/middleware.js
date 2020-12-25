const logger = require('./logger')

const requestLogger = (request, response, next) => {
  if (process.env.NODE_ENV != 'test'){
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
  }
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const getTokenFromAuth = (request, response, next) => {  
  const authorization = request.get('authorization')
  
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {    
    request.body.token = authorization.substring(7)
  } else {
    request.body.token = null
  }

  next();
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  getTokenFromAuth
}