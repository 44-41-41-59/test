'use strict';
const { Schema, model } = require('mongoose');

const WishList = Schema({
  userID: { type: Schema.Types.ObjectId },
  productID: { type: Schema.Types.ObjectId, ref: 'product' },
});
WishList.pre('find', function (next) {
  this.populate('productID');
  next();
});

module.exports = model('wishlist', WishList);
