/**
 * Do token validation.
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const auth = (req, res, next) => {
  if (!req.query.token) {
    return res.status(400).json({
      error: "API token is required.",
    });
  }

  // validate
  if (req.query.token !== process.env.APP_TOKEN) {
    return res.status(400).json({
      error: "Token is invalid.",
    });
  }

  // remove token from query string, pass rest...
  delete req.query.token;

  next();
};

module.exports = auth;
