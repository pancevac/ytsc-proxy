const dotenv = require("dotenv");
// load env vars first to prevent undefined vars...
dotenv.config();

const express = require("express");
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const rateLimit = require("./services/rateLimit");
const connectDB = require("../config/db");
const auth = require('./middleware/auth');
const sanitizer = require('./middleware/sanitizer');
const errorHandler = require('./middleware/error');
const { getStats, getComments } = require('./controllers/requests');

// connect to db
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.set('trust proxy', true); // if app is behind reverse proxy, used for client ip address
app.use(helmet()) // add security headers
app.use(cors())   // enable all cors requests
app.use(rateLimit)  // apply api rate limit

// add routes
app.get('/api/v1/videos', [auth, sanitizer], getStats);
app.get('/api/v1/commentThreads', [auth, sanitizer], getComments);

// custom error handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`App started listening on port ${PORT}`));