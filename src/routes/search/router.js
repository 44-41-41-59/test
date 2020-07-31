'use strict';

const express = require('express');
const router = express.Router();
const { product } = require('../../DB/collection-models');

//get all reviews for one product or store or if you dont put query you will get all the reviews for everything/ add one review to a product (you should pass the productID as a query)
router.route('/search').get(async (req, res, next) => {
  const regex = new RegExp(req.query.searchText, 'i');
  let suggestion = await product.search({ name: regex });
  res.json({ suggestion });
});

module.exports = router;
