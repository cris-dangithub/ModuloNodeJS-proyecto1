const Users = require('../models/users.model');
const AppError = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

exports.validUsersExists = catchAsync(async (req, res, next) => {
  const { senderAccountNumber, receiverAccountNumber } = req.body;
  // buscar que el sender exista en Users
  const senderUser = await Users.findOne({
    where: {
      accountNumber: senderAccountNumber,
      status: true,
    },
  });
  const receiverUser = await Users.findOne({
    where: {
      accountNumber: receiverAccountNumber,
      status: true,
    },
  });
  // Si el usuario que envia o el usuario que recibe no existe, mandar un error
  if (!senderUser || !receiverUser) {
    return next(
      new AppError(`You have entered a non-existent account number`, 404)
    );
  }
  req.senderUser = senderUser;
  req.receiverUser = receiverUser;
  next();
});

exports.validDataTransfer = catchAsync(async (req, res, next) => {
  const { amount } = req.body;
  const { senderUser, receiverUser } = req;
  // Validar que el usuario no transfiera un número negativo o cero
  if (amount <= 0) {
    return next(new AppError(`You can't send $${amount}`, 400));
  }
  // Si el numero de cuenta es igual, mandar un error -> no se puede mandar a si mismo
  if (senderUser.accountNumber === receiverUser.accountNumber) {
    return next(new AppError(`You can't send money to yourself`, 400));
  }
  // Validar si el usuario puede transferir
  if (senderUser.amount < amount) {
    console.log("first")
    return next(new AppError('Insufficient funds', 400));
  }
  next();
});
