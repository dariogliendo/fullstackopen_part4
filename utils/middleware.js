const logger = require('./logger');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'Malformatted ID' });
  } if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }

  return next(error);
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7);
  }
  next();
}

const userExctractor = async (req, res, next) => {
  if (!req.token) return res.status(401).json({error: "Authorization is mandatory for this action"})

  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: "Authorization is mandatory for this action" });
  }
  const user = await User.findById(decodedToken.id);
  if (!user) return res.status(401).json({ error: "Authorization is mandatory for this action" });
  req.user = user
  next()
}

module.exports = {
  errorHandler,
  tokenExtractor,
  userExctractor,
};
