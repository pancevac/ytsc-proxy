const Request = require("../models/Request");
const youtube = require("../services/youtube");

// @desc      Get statistics for video
// @route     GET /api/v1/videos
// @access    Private
exports.getStats = async (req, res, next) => {
  const query = req.query;
  let error = null;

  // make request to YouTube API
  try {
    const ytRes = await youtube.videos.list({
      part: 'statistics',
      id: query.videoId,
    });
  } catch (err) {
    // implement error handling
    error = {
      status: err.response.status,
      message: err.response.data.error.message
    }
  }

  // save request in db
  const request = await Request.create({
    route: "videos",
    ip: req.connection.remoteAddress,
    success: error ? false : true,
    message: error.message,
    query
  });

  // return error response
  if (error) {
    return res.status(error.status).json({
      error: error.message,
    });
  }

  // return success
  res.status(200).json({
    success: true,
    data: ytRes.data
  });
};

// @desc      Get comments by keywords
// @route     GET /api/v1/getComments
// @access    Private
exports.getComments = async (req, res, next) => {
  const query = req.query;
  let error = null;

  // make request to YouTube API
  try {
    const ytRes = youtube.commentThreads.list({
      part: 'snippet, replies',
      maxResults: 100,
      order: 'relevance',
      ...query
    })


  } catch (err) {
    error = {
      status: err.response.status,
      message: err.response.data.error.message
    }
  }

  // save in db
  const request = await Request.create({
    route: "commentThreads",
    ip: req.connection.remoteAddress,
    success: error ? false : true,
    error,
    query
  });

  if (error) {
    res.status(error.status).json({
      error: error.message,
    });
  }

  res.status(200).json({
    success: true,
    data: ytRes.data
  });
};
