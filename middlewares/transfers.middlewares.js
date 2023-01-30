const Users = require('../models/users.model');

exports.validUsersExists = async (req, res, next) => {
  try {
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
      return res.status(404).json({
        status: 'error',
        message: `You have entered a non-existent account number`,
      });
    }
    req.senderUser = senderUser;
    req.receiverUser = receiverUser;
    next();
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};

exports.validDataTransfer = async (req, res, next) => {
  try {
    const { amount } = req.body;
    const { senderUser, receiverUser } = req;
    // Validar que el usuario no transfiera un número negativo o cero
    if (amount <= 0) {
      return res.status(400).json({
        status: 'error',
        message: `You can't send $${amount}`,
      });
    }
    // Si el numero de cuenta es igual, mandar un error -> no se puede mandar a si mismo
    if (senderUser.accountNumber === receiverUser.accountNumber) {
      return res.status(400).json({
        status: 'error',
        message: `You can't send money to yourself`,
      });
    }
    // Validar si el usuario puede transferir
    if (senderUser.amount < amount) {
      return res.status(400).json({
        status: 'error',
        message: 'Insufficient funds',
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};
