'use strict';

const express = require('express');
const router = express.Router();
const { product } = require('../../DB/collection-models');
// const fiftyProducts = require('./data/one.json');
// const oneAndFiftyOne = require('./data/two.json');
const womensShoes = require('./data/womens-shoes.json');
// const tshirts = require('./data/tshirts.json');
// const office = require('./data/office-electronics.json');
// const mother = require('./data/mother.json');
// const dresses = require('./data/dresses.json');
// const acces = require('./data/accessories.json');






function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function seedProducts(req, res, next) {
  try {
    let productsArr = womensShoes.products;

    for (let key in productsArr) {
      let record = {
        name: productsArr[key].title,
        price: getRandomInt(0,350),
        images: [productsArr[key].images[0].src, productsArr[key].images[1].src, (productsArr[key].images[2])?((productsArr[key].images[3].src)):'', (productsArr[key].images[3])?(productsArr[key].images[3].src):''],
        amount: getRandomInt(0,200),
        // description: '',
        category: "Women's Shoes",
        storeID: '5f2b27376984d3189b501a42',
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
