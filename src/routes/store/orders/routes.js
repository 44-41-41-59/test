'use strict';
const express = require('express');
const router = express.Router();
const bearer = require('../../../middlewares/auth/bearer');
const permissions= require('../../../middlewares/auth/authorize');

const { addOrder, editOrder, getAllOrders, getOneOrder, deleteOrder } = require('./orders.js');

// get all orders for one store // the 
router.route('/order/store/:storeID').get(bearer('registered'), permissions('readOrders'), getAllOrders);
//patch order by ID to change its status only
router.route('/order/:id').patch(bearer('registered'), permissions('updateOrder'), editOrder);
// get one order by ID
router.route('/order/:id').get(bearer('registered'), permissions('readOrders'),getOneOrder);
// delete one order by ID
router.route('/order/:id').delete(bearer('registered'), permissions('deleteOrder'), deleteOrder);

// skip: will be added when the cart is charger 
// router.route('/order').post(addOrder);

module.exports = router;

