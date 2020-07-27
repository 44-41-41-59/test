'use strict';

const express = require('express');
const bearer = require('../../middlewares/auth/bearer');
const permissions = require('../../middlewares/auth/authorize');
const {
  getMainProducts,
  addProductsHandler,
  getProducts,
  updateProducts,
  deleteProducts,
  getStoreProducts,
  getProductsById,
} = require('./products.js');

const router = express.Router();
// get all products from all stores by USER
router.route('/products').get(getProducts);
// add products for each store by OWNER
// bearer('registered'), permissions('create'),
router
  .route('/products')
  .post(bearer('registered'), permissions('createProduct'), addProductsHandler);

router.route('/products/main').get(getMainProducts);
// get one product from all stores by USER/OWNER
// bearer('none'),
router.route('/products/:id').get(bearer('none'), getProductsById);
// update each product by id by OWNER
// bearer('registered'), permissions('update'),
router
  .route('/products/:id')
  .put(bearer('registered'), permissions('updateProduct'), updateProducts);
// delete each product by id by OWNER
// bearer('registered'), permissions('delete'),
router
  .route('/products/:id')
  .delete(bearer('registered'), permissions('deleteProduct'), deleteProducts);
// get all products of a specific store
router.route('/products/store/:storeID').get(getStoreProducts);

module.exports = router;
