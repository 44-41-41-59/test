'use strict';
const { Schema, model } = require('mongoose');

const review = Schema({
  userID: { type: Schema.Types.ObjectId, required: true ,ref: 'user' },
  review: { type: String, required: true },
  rate: { type: Number, required: true, min: 0, max: 5 },
  storeID: { type: Schema.Types.ObjectId, ref: 'store'},
  productID: { type: Schema.Types.ObjectId, ref: 'product'},
},
{ toObject: { virtuals: true } },
{ toJSON: { virtuals: true } },
);

review.pre('find', function () {
  this.populate('userID');
  // .populate('storeID')
  // .populate('productID');
});
review.post('save', async function (next) {
  await this.populate('userID').execPopulate();
  // next();
});

module.exports = model('review', review);
