'use strict';
const { payement } = require('../../../DB/collection-models');

// get all of the payment history for one user
function getPaymentHistory(req, res, next) {
  payement
    .read({ userID: req.user.id })
    .then((data) => res.json({ count: data.length, results: data }));
}
// add one item to the payment history
function addPaymentHistory(req, res, next) {
  let userID = req.user.id;
  let { productID, cost } = req.body;
  payement
    .create({ userID, productID, cost })
    .then((data) => res.json({ result: data }));
}
// delete one item form the payment history
function deletePaymentHistory(req, res, next) {
  payement
    .delete(req.params.id)
    .then((data) => res.send(`Payment history ${req.params.id} deleted.`));
}
// get one item form a payment history
function getOnePaymentHistory(req, res, next) {
  payement
    .read({ _id: req.params.id })
    .then((data) => res.json({ paymentHistory: data[0] }));
}

module.exports = {
  getPaymentHistory,
  addPaymentHistory,
  deletePaymentHistory,
  getOnePaymentHistory,
};
