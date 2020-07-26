'use strict';
const { Schema, model } = require('mongoose');
// const reviews = require('../subdocuments/reviews.js');
// console.log(reviews);
const Product = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  viwes: { type: Number },
  images: { type: Array },
  amount: { type: Number },
  description: { type: String },
  category: { type: String },
  storeID: { type: String, required: true },
  hidden: { type: Boolean, default: false },
});

Product.virtual('reviews', {
  ref: 'review',
  localField: '_id',
  foreignField: 'productID',
});

module.exports = model('product', Product);
