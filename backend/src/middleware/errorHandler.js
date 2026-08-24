const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = 'Internal server error';

  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found';
  } else if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation failed';
  } else if (err.code === 11000) {
    statusCode = 400;
    message = 'Duplicate field value entered';
  } else if (statusCode < 500 && err.message) {
    // Preserve useful client-facing messages for known 4xx errors.
    message = err.message;
  } else if (err.statusCode && err.statusCode >= 400 && err.statusCode < 500 && err.message) {
    statusCode = err.statusCode;
    message = err.message;
  }

  const response = {
    success: false,
    message,
  };

  // Never expose stack traces outside development. NODE_ENV being unset must fail closed.
  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

module.exports = errorHandler;
