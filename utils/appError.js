class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.status = 'error';
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
