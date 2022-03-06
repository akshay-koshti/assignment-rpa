const express = require('express');
const authController = require('../controllers/authController');
const walletController = require('../controllers/walletController');

const router = express.Router();

router
  .use(authController.protect);

router
  .get('/', walletController.getAmount)

router
  .patch('/creditAmount', walletController.creditAmount);

router
  .patch('/debitAmount', walletController.debitAmount);

module.exports = router;
router
  .patch('/creditAmount', walletController.creditAmount);

module.exports = router;
