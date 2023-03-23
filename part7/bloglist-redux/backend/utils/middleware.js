const logger = require('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


const requestLogger = (req, res, next) => {
  logger.info('Method', req.method)
  logger.info('Path', req.path)
  logger.info('Body', req.body)
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  logger.error(error.message)

  if (error.name === 'CastError'){
    return res.status(400).send({ error: 'malformed id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
}

const tokenExtractor = (req, res, next) => {
  const auth = req.get('authorization')
  if(auth && auth.startsWith('Bearer ')) {
    req.token = auth.replace('Bearer ', '')
  }
  next()
}

const userExtractor = async (req, res, next) => {
  if(req.token) {
    const authToken = jwt.verify(req.token, process.env.SECRET)
    if (!authToken.id) {
      return res.status(404).json({ error: 'invalid token' })
    }
    const user = await User.findById(authToken.id)
    if(user) {
      req.user = user
    }
  }
  next()
}

const commentExtractor = async (req, res, next) => {
  console.log(req)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
  commentExtractor
}