const { makeTransfer } = require('../controllers/transfers.controllers');
const { Router } = require('express');
const {
  validUsersExists,
  validDataTransfer,
} = require('../middlewares/transfers.middlewares');
const { check } = require('express-validator');
const { validFields } = require('../middlewares/validFields.middleware');
const router = Router();

router.post(
  '/',
  [
    check('amount', 'The amount must be mandatory').not().isEmpty(),
    check('senderAccountNumber', 'The sender account number must be mandatory')
      .not()
      .isEmpty(),
    check(
      'receiverAccountNumber',
      'The receiver account number must be mandatory'
    )
      .not()
      .isEmpty(),
    validFields,
    validUsersExists,
    validDataTransfer,
  ],
  makeTransfer
);

module.exports = {
  transfersRouter: router,
};
