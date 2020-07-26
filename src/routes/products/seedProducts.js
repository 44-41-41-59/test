'use strict';

const express = require('express');
const router = express.Router();
const { product } = require('../../DB/collection-models');
const json = require('./data/one.json');

function seedProducts(req, res, next) {
  try {
    let productsArr = json.products;
    for (let key in productsArr) {
      let record = {
        name: productsArr[key].title,
        price: productsArr[key].variants[0].price,
        images: productsArr[key].images[0].src,
        amount: productsArr[key].variants[0].inventory_quantity,
        // description: '',
        category: 'general',
        storeID: '5ef36c9b348f300017ae7091', // make it dynamic
        hidden: false,
      };

      product.create(record);
    }
    res.send('Done seeding products.');
  } catch (e) {
    next({ status: 500, message: e.message });
  }
}

router.route('/seed/products').post(seedProducts);


module.exports = router;


