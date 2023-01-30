const Transfers = require('../models/transfers.model');

exports.makeTransfer = async (req, res) => {
  try {
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
    res.json({
      status: 'success',
      message: 'The transfer has been successful',
      newTransfer,
      newSenderBalance: newSenderBalance.amount,
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};
