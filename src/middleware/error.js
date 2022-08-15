const ErrorResponse = require('../utils/ErrorResponse')
const Sentry = require('@sentry/node');


const errorHandler = (err, req, res, next) => {
  // log to console for dev
  // console.log(err.stack)

  let error = err;

  // mongoose validation error
  if (err.name === 'ValidationError') {
    error = new ErrorResponse(err._message, 400);
  }

  console.log(error);

  if (err.statusCode == 500) {
    Sentry.captureException(error);
  }

  // finally, send response
  res.status(error.statusCode || 500).json({
    error: error.message || 'Something went wrong!'
  })
}

module.exports = errorHandler