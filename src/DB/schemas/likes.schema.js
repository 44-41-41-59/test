'use strict';
const { Schema, model } = require('mongoose');

const Like = Schema({
  userID: { type: Schema.Types.ObjectId, ref: 'user' },
  productID: { type: Schema.Types.ObjectId, ref: 'product' },
  storeID: { type: Schema.Types.ObjectId, ref: 'store' },
});

Like.pre('find', function (next) {
  this.populate('productID').populate('userID').populate('storeID');
  next();
});

module.exports = model('like', Like);
