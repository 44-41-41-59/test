'use strict';

const { cart } = require('../../DB/collection-models');

function getCart(req, res, next) {
  cart.read({ userID: req.params.id }).then((data) => res.json(data));
}

function addCart(req, res, next) {
  let { products, quantity } = req.body;
  console.log(req.user._id, 'user id');
  cart
    .create({ products, quantity, userID: req.user._id })
    .then((results) => {
      res.json(results);
    })
    .catch(next);
}

function deleteCart(req, res, next) {
  let cartID = req.params.id;
  // console.log(cartID);
  cart
    .delete({_id:cartID})
    .then((record) => {
      res.json(record);
    })
    .catch(next);
}

function editCart(req, res, next) {
  let cartID = req.params.id;
  cart
    .update(cartID, req.body)
    .then((record) => {
      res.json(record);
    })
    .catch(next);
}

module.exports = {
  getCart,
  addCart,
  deleteCart,
  editCart,
};
