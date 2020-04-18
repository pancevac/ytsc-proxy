/**
 * Sanitize query string.
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const sanitize = (req, res, next) => {
  const allowedParams = ["videoId", "searchTerms"];
  const query = {};

  // filter only allowed params
  allowedParams.forEach((param) => {
    if (req.query[param]) {
      query[param] = req.query[param];
    }
  });

  req.query = query;
  next();
};

module.exports = sanitize;
