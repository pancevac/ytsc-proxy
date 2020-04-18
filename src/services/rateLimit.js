const rateLimit = require('express-rate-limit')

const limit = rateLimit({
  windowMs: (process.env.API_LIMIT_WINDOW || 15) * 60 * 1000, // given minute/s window
  max: process.env.API_LIMIT_MAX || 100 // limit each IP to given requests per windowMs
});

module.exports = limit