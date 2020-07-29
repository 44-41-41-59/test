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
    description: { type: String },
    category: { type: String },
    sale: { type: Number, default: 0 },
    storeID: { type: Schema.Types.ObjectId, required: true },
    hidden: { type: Boolean, default: false },
    Timestamp: {
      type: Date,
      default: Date.now,
    },
    // review: [{ type: Schema.Types.ObjectId, ref: 'review' }],
  },
  { toObject: { virtuals: true } },
  { toJSON: { virtuals: true } }
);

product.virtual('review', {
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

product.pre('find', function (next) {
  console.log('helo from pre');
  // this.populate();
  // .populate('like');
  next();
});

module.exports = model('product', product);
