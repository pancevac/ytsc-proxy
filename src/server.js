const express = require("express");
const dotenv = require("dotenv");
const morgan = require('morgan')
const connectDB = require("../config/db");
const auth = require('./middleware/auth');
const sanitizer = require('./middleware/sanitizer');
const errorHandler = require('./middleware/error');

// load env vars
dotenv.config();

// connect to db
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// loaded after dotenv, otherwise, api key required in controller will be null
// load controller methods
const { getStats, getComments } = require('./controllers/requests');

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// add routes
app.get('/videos', [auth, sanitizer], getStats);
app.get('/commentThreads', [auth, sanitizer], getComments);

// custom error handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`App started listening on port ${PORT}`));