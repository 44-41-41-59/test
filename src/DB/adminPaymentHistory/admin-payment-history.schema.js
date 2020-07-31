'use strict';
const { Schema, model } = require('mongoose');

const OrdersPayments = Schema({
  // userID: { type: Schema.Types.ObjectId },
  orders: [{ type: Schema.Types.ObjectId, ref: 'order' }],
  // paymentsHistory: { type: Schema.Types.ObjectId, ref: 'paymentsHistory' },
  // invalid: [{ type: Schema.Types.ObjectId, ref: 'order',default:[] }],
  userID: { type: String },
  paymentsHistory: { type: String },
  invalid: [{ type: String, ref: 'order', default: [] }],
  Timestamp: {
    type: Date,
    default: Date.now,
  },
});
OrdersPayments.pre('find', function () {
  this.populate('orders');
});

module.exports = model('orderpayment', OrdersPayments);
