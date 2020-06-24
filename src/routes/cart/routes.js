'use strict';

const express = require('express');
const router = express.Router();
const bearer = require('../../middlewares/auth/bearer');
const permissions= require('../../middlewares/auth/authorize');
const {getCart, addCart, deleteCart, editCart} = require('./cart');

// add one cart item 
router.route('/cart').post(bearer('registered'), permissions('addCart'), addCart);
// edit one cart item (product quantity)
router.route('/cart/:id').put(bearer('registered'), permissions('updateCart'), editCart);
//delete cart item
router.route('/cart/:id').delete(bearer('registered'), permissions('deleteCart'), deleteCart);
// get all cart items for one user
router.route('/cart/user/:userID').get(bearer('registered'), permissions('readUserCart'), getCart);

module.exports = router;

