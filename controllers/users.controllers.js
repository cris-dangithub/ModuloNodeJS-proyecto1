const Transfers = require('../models/transfers.model');
const Users = require('../models/users.model');

exports.createUserAccount = async (req, res) => {
  try {
    const { name, password } = req.body;
    const accountNumber = Math.floor(Math.random() * 1000000);
    const newAccount = await Users.create({
      name: name.toLowerCase(),
      accountNumber,
      password,
    });

    res.status(200).json({
      status: 'success',
      message: 'Account has been created',
      newAccount,
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    // Todas las validaciones correctas
    res.status(200).json({
      status: 'success',
      message: 'Successfully logged in',
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};

exports.getAllUserTransfers = async (req, res) => {
  try {
    const { id } = req.params;
    // obtener el historial
    const history = await Transfers.findAll({
      where: {
        senderUserId: id,
      },
    });

    res.status(200).json({
      status: 'success',
      message: 'History successfully obtained',
      history,
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};

