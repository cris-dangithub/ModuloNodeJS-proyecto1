const { Router } = require('express');
const { check } = require('express-validator');
const {
  createUserAccount,
  loginUser,
  getAllUserTransfers,
} = require('../controllers/users.controllers');
const {
  validUserExistsByAccountNumber,
  validUserExistsById,
  validUserCredentials,
} = require('../middlewares/users.middlewares');
const { validFields } = require('../middlewares/validFields.middleware');

const router = Router();

router.post(
  '/signup',
  [
    check('name', 'Username name must be mandatory').not().isEmpty(),
    check('name', 'Username must be a string').isString(),
    check('password', 'The password must be mandatory').not().isEmpty(),
    check(
      'password',
      'The password must have a minimum of 9 characters'
    ).isLength({
      min: 9,
    }),
    validFields,
  ],
  createUserAccount
);
router.post(
  '/login',
  [
    check('accountNumber', 'The accountNumber must be mandatory')
      .not()
      .isEmpty(),
    check('accountNumber', 'The accountNumber must be a number').isNumeric(),
    check('password', 'The password must be mandatory').not().isEmpty(),
    validFields,
    validUserExistsByAccountNumber,
    validUserCredentials,
  ],
  loginUser
);
router.get('/:id/history', validUserExistsById, getAllUserTransfers);

module.exports = {
  usersRouter: router,
};

