const Users = require('../models/users.model');

exports.validUserExistsByAccountNumber = async (req, res, next) => {
  try {
    const { accountNumber } = req.body;
    const user = await Users.findOne({
      where: {
        accountNumber,
      },
    });
    // si no existe, retornar una respuesta 404
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User has not been found',
      });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};

exports.validUserCredentials = async (req, res, next) => {
  try {
    const { password } = req.body;
    const { user } = req;
    // validar que el status esté en true;
    if (!user.status) {
      return res.status(400).json({
        status: 'error',
        message:
          'The user does not have its account available. Please contact customer service',
      });
    }
    // validar que la contraseña sea la correcta
    if (user.password !== password) {
      return res.status(400).json({
        status: 'error',
        message: 'Incorrect password',
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

exports.validUserExistsById = async (req, res, next) => {
  try {
    // Verificar que el usuario exista
    const { id } = req.params;
    const user = await Users.findOne({
      where: {
        id,
        status: true,
      },
    });
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User has not been found',
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
