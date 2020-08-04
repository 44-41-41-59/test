'use strict';
const { Schema, model } = require('mongoose');

const Cart = Schema({
  userID: { type: Schema.Types.ObjectId,  required: true  },
  products: { type: Schema.Types.ObjectId, ref: 'product',  required: true  },
  quantity: { type: Number,  required: true  },
});

Cart.pre('find', function (next) {
  this.populate('products');
  next();
});
Cart.post('save', async function (next) {
  await this.populate('products').execPopulate();
  // next();
});

module.exports = model('cart', Cart);
