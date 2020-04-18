const Request = require("../models/Request");
const youtube = require("../services/youtube");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/ErrorResponse");

// @desc      Get statistics for video
// @route     GET /api/v1/videos
// @access    Private
exports.getStats = asyncHandler(async (req, res, next) => {
  const query = req.query;
  let error = null;

  // make request to YouTube API
  try {
    const ytRes = await youtube.videos.list({
      part: "statistics",
      id: query.videoId,
    });
  } catch (err) {
    error = new ErrorResponse(
      err.response.data.error.message,
      err.response.status
    )
  }

  // save request in db
  const request = await Request.create({
    route: "videos",
    ip: req.connection.remoteAddress,
    success: error ? false : true,
    message: error.message,
    query,
  });

  if (error) return next(error);

  // return success
  res.status(200).json({
    success: true,
    data: ytRes.data,
  });
});

// @desc      Get comments by keywords
// @route     GET /api/v1/getComments
// @access    Private
exports.getComments = asyncHandler(async (req, res, next) => {
  const query = req.query;
  let error = null;

  // make request to YouTube API
  try {
    const ytRes = youtube.commentThreads.list({
      part: "snippet, replies",
      maxResults: 100,
      order: "relevance",
      ...query,
    });
  } catch (err) {
    error = new ErrorResponse(
      err.response.data.error.message,
      err.response.status
    )
  }

  // save in db
  const request = await Request.create({
    route: "commentThreads",
    ip: req.connection.remoteAddress,
    success: error ? false : true,
    error,
    query,
  });

  if (error) return next(error);

  res.status(200).json({
    success: true,
    data: ytRes.data,
  });
});
