'use strict';

const express = require('express');
const router = express.Router();
const bearer = require('../../middlewares/auth/bearer');
const permissions= require('../../middlewares/auth/authorize');
const {getReviews, getOneReview, addReview, editReview, deleteReview} = require('./reviews.js');

//get all reviews for one product or store or if you dont put query you will get all the reviews for everything/ add one review to a product (you should pass the productID as a query)
router.route('/review') 
  .post(bearer('registered'), permissions('addReview'), addReview)
  .get(getReviews);
// get one review on a specific product or store / edit one review on a product or store/ delete one review on a product or a store
router.route('/review/:id')
  .get(getOneReview)
  .put(bearer('registered'), permissions('updateReview'), editReview)
  .delete(bearer('registered'), permissions('deleteReview'), deleteReview);

module.exports = router;
