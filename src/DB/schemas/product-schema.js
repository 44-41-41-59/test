'use strict';
const { Schema, model } = require('mongoose');
// const reviews = require('../subdocuments/reviews.js');
// console.log(reviews);
const Product = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  viwes: { type: Number, default: 0 },
  images: { type: Array },
  amount: { type: Number },
  description: { type: String },
  category: { type: String },
  seal: { type: Number, default: 0 },
  storeID: { type: String, required: true },
  hidden: { type: Boolean, default: false },
  Timestamp: {
    type: Date,
    default: Date.now,
  },
});

Product.virtual('reviews', {
  ref: 'review',
  localField: '_id',
  foreignField: 'productID',
});

module.exports = model('product', Product);
