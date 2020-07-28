'use strict';
const { Schema, model } = require('mongoose');

const review = Schema({
  userID: { type: String, required: true },
  review: { type: String, required: true },
  rate: { type: Number, required: true, min: 0, max: 5 },
  storeID: { type: String },
  productID: { type: Schema.Types.ObjectId },
});

module.exports = model('review', review);
