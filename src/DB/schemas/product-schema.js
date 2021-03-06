'use strict';
const { Schema, model } = require('mongoose');
const reviews = require('../schemas/reviews-schema');
// console.log(reviews);
const product = Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    views: { type: Number, default: 0 },
    images: { type: Array },
    amount: { type: Number },
    specs: { type: Map, of: String },
    description: { type: String },
    category: { type: String },
    sale: { type: Number, default: 0 },
    storeID: { type: String, required: true },
    hidden: { type: Boolean, default: false },
    Timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

product.virtual('reviews', {
  ref: 'review',
  localField: '_id',
  foreignField: 'productID',
});

product.virtual('like', {
  ref: 'like',
  localField: '_id',
  foreignField: 'productID',
  count: true,
});

product.pre('find', function () {
  this.populate('reviews');
  // .populate('like');
});

module.exports = model('product', product);
