'use strict';

const express = require('express');
const bearer = require('../../middlewares/auth/bearer');
const permissions= require('../../middlewares/auth/authorize');
const {
  getPaymentHistory,
  // addPaymentHistory,
  deletePaymentHistory,
  getOnePaymentHistory,
} = require('./payment-history.js');

const router = express.Router();
// get all of the payment history for one user
router.route('/payment/history/all/:userID').get(bearer('registered'), permissions('readPaymentHistory') , getPaymentHistory);
// get one item form the payment history
router.route('/payment/history/:id').get(bearer('registered'), permissions('readPaymentHistory'), getOnePaymentHistory);
// delete one item form the payment history
router.route('/payment/history/:id').delete(bearer('registered'), permissions('deletePaymentHistory'), deletePaymentHistory);

// Skip: will be called when checkout from cart
// add one item to the payment history
// router.route('/payment/history').post(addPaymentHistory);

module.exports = router;
