const createError = require('http-errors');

exports.checkAuth = (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    req.token = req.headers.authorization.split(' ')[1];
    next()
  } else {
    const err = createError(401)
    res.status(err.status).json(err.message)
  }
}