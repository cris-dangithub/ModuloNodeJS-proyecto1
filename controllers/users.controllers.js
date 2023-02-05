const Transfers = require('../models/transfers.model');
const Users = require('../models/users.model');
const { appSuccess } = require('../utils/appSuccess');
const { catchAsync } = require('../utils/catchAsync');

exports.createUserAccount = catchAsync(async (req, res) => {
  const { name, password } = req.body;
  const accountNumber = Math.floor(Math.random() * 1000000);
  const newAccount = await Users.create({
    name: name.toLowerCase(),
    accountNumber,
    password,
  });
  appSuccess(res, 200, 'Account has been created', { newAccount });
});

exports.loginUser = catchAsync(async (req, res) => {
  // Todas las validaciones correctas
  appSuccess(res, 200, 'Successfully logged in');
});

exports.getAllUserTransfers = catchAsync(async (req, res) => {
  const { id } = req.params;
  // obtener el historial
  const history = await Transfers.findAll({
    where: {
      senderUserId: id,
    },
  });
  appSuccess(res, 200, 'History successfully obtained', { history });
});
