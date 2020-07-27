'use strict';
const { Schema, model } = require('mongoose');

const Advertising = Schema({
  image: { type: String },
  count: { type: Number },
  storeId: { type: Schema.Types.ObjectId, ref: 'store' },
  link: { type: String, default: '#' },
});

module.exports = model('advertising', Advertising);
