'use strict';

const { review } = require('../../DB/collection-models');

// get reviews for one product or one store
function getReviews(req, res, next) {
  let key, reviewType;
  if (req.body.productID) {
    key = 'productID';
    reviewType = req.body.productID;
  } else if (req.body.storeID) {
    key = 'storeID';
    reviewType = req.body.storeID;
  }
  review
    .read({ [key]: reviewType })
    .then((data) => res.json({ count: data.length, results: data }))
    .catch(next);
}

// get a specifc review on one product or one store // can be refactored to be joined with the previous function
function getOneReview(req, res, next) {
  review
    .read({ _id: req.params.id })
    .then((data) => res.json({ count: data.length, results: data }))
    .catch(next);
}

// add one review on a product or a store
function addReview(req, res, next) {
  let userID = req.user.id;
  review
    .create({ ...req.body, userID })
    .then((results) => {
      res.json(results);
    })
    .catch(next);
}

function deleteReview(req, res, next) {
  let id = req.params.id;
  review
    .delete(id)
    .then((record) => {
      res.json(record);
    })
    .catch(next);
}

function editReview(req, res, next) {
  let id = req.params.id;
  review
    .update(id, req.body)
    .then((record) => {
      res.json(record);
    })
    .catch(next);
}

module.exports = {
  getReviews,
  getOneReview,
  addReview,
  editReview,
  deleteReview,
};
