'use strict';
const { Schema, model } = require('mongoose');

const Cart = Schema({
  userID: { type: Schema.Types.ObjectId },
  products: { type: Schema.Types.ObjectId, ref: 'product' },
  quantity: { type: Number },
});

Cart.pre('find', function (next) {
  this.populate('products');
  next();
});

module.exports = model('cart', Cart);
