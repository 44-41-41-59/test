'use strict';
require('dotenv').config();
const express = require('express');
const router = express.Router();
const bearer = require('../../middlewares/auth/bearer');
const permissions = require('../../middlewares/auth/authorize');
const stripe = require('stripe')(process.env.SECERTSTRIPEKEY);
const { cart, payment, order } = require('../../DB/collection-models');
const payments = require('../../DB/adminPaymentHistory/admin-payment-history.model');

router
  .route('/charge')
  .post(bearer('registered'), permissions('checkoutCart'), pay);
async function pay(req, res, next) {
  // try {
  //   // for later bring user id from token
  //   let obj = {};
  //   let storeProductIDs = [];
  let amount = 500; // it should be called amount for stripe DONT change it
  //   let cartArr = await cart.test(req.user.id); // array of object(cart based on user populated with products)
  //   cartArr.forEach((element) => {
  //     storeProductIDs.push(element.products._id);
  //     amount += element.products.price;
  //     if (obj[element.products.storeID])
  //       obj[element.products.storeID].push(element.products._id);
  //     else obj[element.products.storeID] = [element.products._id]; // create array for the store to store the product ids
  //   });
  //   let savedPayment = await payment.create({
  //     //payment history for USER
  //     userID: req.user.id,
  //     productID: storeProductIDs,
  //     cost: amount,
  //   });
  //   let ordersIDs = [];
  //   for (let key in obj) {
  //     let savedOrder = await order.create({
  //       storeID: key,
  //       products: obj[key],
  //       userID: req.user.id,
  //     });
  //     ordersIDs.push(savedOrder._id);
  //   }
  //   await payments.create({
  //     //payment history for ADMIN
  //     paymentsHistory: savedPayment._id,
  //     userID: req.user.id,
  //     orders: ordersIDs,
  //   });
  //   res.json(cartArr);

  // DONT DELETE Comment-----------------------------------------

  stripe.customers
    .create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken,
    })
    .then((customer) => {
      stripe.charges.create({
        amount,
        description: 'DAAY-mall check',
        currency: 'usd',
        customer: customer.id,
      });
    })
    .then((charge) => {

      res.send('done');
    })
    .catch((e) => next({ status: 500, message: e.message }));
  // } catch (e) {
  //   next({ status: 500, message: e.message });
  // }
}

module.exports = router;
