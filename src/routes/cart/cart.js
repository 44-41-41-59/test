'use strict';

const {cart} = require('../../DB/collection-models');

function getCart(req, res, next) {
  // console.log(req.qurey)
  cart.read({userID:req.params.userID}).then((data) => res.json(data));
  // let key, cartType;
  // if (req.query.productID) {
  //   key = 'productID';
  //   cartType = req.query.productID;
  // }
  // cart
  //   .read({ [key]: cartType })
  //   .then((data) => res.json({ count: data.length, results: data }))
  //   .catch(next);
}

// function getOneCart(req, res, next) {
//   cart
//     .read({ _id: req.params.id })
//     .then((data) => res.json({ count: data.length, results: data }))
//     .catch(next);
// }

function addCart(req, res, next) {
  // if ( req.query.productID){
  //   req.body.productID = req.query.productID;
  // }
  cart
    .create(req.body)
    .then((results) => {
      res.json(results);
    })
    .catch(next);
}

function deleteCart(req, res, next) {
  let cartID = req.params.id;
  console.log(cartID);
  cart
    .delete( cartID )
    .then((record) => {
      res.json(record);
    })
    .catch(next);
}

function editCart(req, res, next) {
  let cartID = req.params.id;
  cart
    .update( cartID, req.body )
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
