const Transfers = require('../models/transfers.model');
const { appSuccess } = require('../utils/appSuccess');
const { catchAsync } = require('../utils/catchAsync');

exports.makeTransfer = catchAsync(async (req, res) => {
  const { amount } = req.body;
  const { senderUser, receiverUser } = req;
  // Creación de la transferencia
  const newTransfer = await Transfers.create({
    amount,
    senderUserId: senderUser.id,
    receiverUserId: receiverUser.id,
  });
  // Actualizar la cuenta de los usuarios involucrados en la transferencia
  const newSenderBalance = await senderUser.update({
    amount: senderUser.amount - amount,
  });
  await receiverUser.update({
    amount: receiverUser.amount + amount,
  });
  // Mandar respuesta al cliente
  appSuccess(res, 200, 'The transfer has been successful', {
    newTransfer,
    newSenderBalance: newSenderBalance.amount,
  });
});
