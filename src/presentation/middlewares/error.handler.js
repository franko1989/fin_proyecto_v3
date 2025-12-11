const { BaseError } = require('../../domain/errors');

function errorHandler(err, req, res, next) {
  console.error("=== ERROR DETECTED ===");
  console.error(err);
  console.error("=====================");

  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  res.status(500).json({
    message: "An internal server error occurred",
  });
}

module.exports = errorHandler;
