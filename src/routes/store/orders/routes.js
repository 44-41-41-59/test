'use strict';
const express = require('express');
const router = express.Router();

const { addOrder, editOrder, getAllOrders, getOneOrder, deleteOrder } = require('./orders.js');

// skip: will be added when the cart is charger 
router.route('/order').post(addOrder);
// get all orders
router.route('/order').get(getAllOrders);
router.route('/order/:id').put(editOrder).patch(editOrder).get(getOneOrder).delete(deleteOrder);

module.exports = router;

