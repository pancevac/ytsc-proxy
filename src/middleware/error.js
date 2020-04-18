const ErrorResponse = require('../utils/ErrorResponse')

const errorHandler = (err, req, res, next) => {
  // log to console for dev
  // console.log(err.stack)

  let error = err;

  // mongoose validation error
  if (err.name === 'ValidationError') {
    error = new ErrorResponse(err._message, 400);
  }

  // finally, send response
  res.status(error.statusCode || 500).json({
    error: error.message || 'Something went wrong!'
  })
}

module.exports = errorHandler