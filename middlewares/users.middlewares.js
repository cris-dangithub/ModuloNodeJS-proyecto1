const Users = require('../models/users.model');
const AppError = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

exports.validUserExistsByAccountNumber = catchAsync(async (req, res, next) => {
  const { accountNumber } = req.body;
  const user = await Users.findOne({
    where: {
      accountNumber,
    },
  });
  // si no existe, retornar una respuesta 404
  if (!user) {
    return next(new AppError('User has not been found', 404));
  }
  req.user = user;
  next();
});

exports.validUserCredentials = catchAsync(async (req, res, next) => {
  const { password } = req.body;
  const { user } = req;
  // validar que el status esté en true;
  if (!user.status) {
    return next(
      new AppError(
        'The user does not have its account available. Please contact customer service',
        400
      )
    );
  }
  // validar que la contraseña sea la correcta
  if (user.password !== password) {
    return next(new AppError('Incorrect password', 400));
  }
  next();
});

exports.validUserExistsById = catchAsync(async (req, res, next) => {
  // Verificar que el usuario exista
  const { id } = req.params;
  const user = await Users.findOne({
    where: {
      id,
      status: true,
    },
  });
  if (!user) {
    return next(new AppError('User has not been found', 404));
  }
  next();
});
