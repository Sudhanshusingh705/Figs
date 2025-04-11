// Custom Error Class for API errors
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  
  // Log error in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', err);
  }
  
  // Handle specific error types
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(el => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return res.status(400).json({
      success: false,
      message,
      errors
    });
  }

  if (err.code === 11000) {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = `Duplicate field value: ${value}. Please use another value!`;
    return res.status(400).json({
      success: false,
      message
    });
  }

  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token. Please log in again!';
    return res.status(401).json({
      success: false,
      message
    });
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Your token has expired! Please log in again.';
    return res.status(401).json({
      success: false,
      message
    });
  }

  // Handle file upload errors
  if (err.name === 'MulterError') {
    let message = 'File upload error.';
    if (err.code === 'LIMIT_FILE_SIZE') {
      message = 'File is too large. Maximum size is 10MB.';
    } else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      message = 'Too many files uploaded. Please check the allowed number of files.';
    } else if (err.code === 'LIMIT_FILE_COUNT') {
      message = 'Too many files uploaded. Please check the allowed number of files.';
    } else if (err.code === 'LIMIT_FIELD_KEY') {
      message = 'Field name too long.';
    } else if (err.code === 'LIMIT_FIELD_VALUE') {
      message = 'Field value too long.';
    } else if (err.code === 'LIMIT_FIELD_COUNT') {
      message = 'Too many fields.';
    } else if (err.code === 'LIMIT_PART_COUNT') {
      message = 'Too many parts.';
    }
    return res.status(400).json({
      success: false,
      message
    });
  }

  // Send error response
  res.status(err.statusCode).json({
    success: false,
    message: err.message || 'Something went wrong',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = {
  AppError,
  errorHandler
}; 