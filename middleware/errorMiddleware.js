const logger = require("../config/logger");

const errorMiddleware = (err, req, res, next) => {
  // log error
  logger.error({
    message: err.message,
    status: err.statusCode || 500,
    url: req.originalUrl,
    method: req.method,
  });

  res.status(err.statusCode || 500).json({
    status: "fail",
    message: err.message,
  });
};

module.exports = errorMiddleware;