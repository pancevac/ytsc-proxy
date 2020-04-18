/**
 * Do token validation.
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const auth = (req, res, next) => {
  if (!req.query.key) {
    return res.status(400).json({
      error: "API token is required.",
    });
  }

  // validate
  if (req.query.key !== process.env.APP_TOKEN) {
    return res.status(400).json({
      error: "Token key is invalid.",
    });
  }

  // remove token from query string, pass rest...
  delete req.query.key;

  next();
};

module.exports = auth;
