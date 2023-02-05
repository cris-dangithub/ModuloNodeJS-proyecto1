const AppError = require('../utils/appError');

const sendErrorDev = (err, res) => {
  console.log('fsdfsd');
  const { statusCode, status, message, stack } = err;
  res.status(statusCode).json({
    status,
    message,
    error: err,
    stack,
  });
};

const sendErrorProd = (err, res) => {
  const { isOperational, statusCode, status, message } = err;
  if (isOperational) {
    res.status(statusCode).json({
      status,
      message,
    });
  } else {
    res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};

// Error por tipo de dato introducido para la base de datos
const handleSequelizeError22P02 = err => {
  return new AppError(err.message, 400);
};

exports.globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'fail';
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  }
  if (process.env.NODE_ENV === 'production') {
    if (err.parent?.code === '22P02') err = handleSequelizeError22P02(err);
    sendErrorProd(err, res);
  }
};
