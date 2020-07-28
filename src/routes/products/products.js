'use strict';

const { product } = require('../../DB/collection-models');
const viewedModel = require('../../DB/viewed/viewed-model');

// add products for each store by OWNER
function addProductsHandler(req, res) {
  product
    .create(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(403).send(err.message));
}

// get all products from all stores by USER
async function getProducts(req, res, next) {
  let products;
  let searchText = req.query.searchText;
  let category = req.query.category;
  if (searchText) {
    const regex = new RegExp(searchText.split('+').join(' '));
    products = await product.read({ name: regex });
  } else if (category) {
    products = await product.read({ category: category.split('+').join(' ') });
  } else {
    products = await product.read();
  }
  let result = {
    count: products.length,
    results: products,
  };
  res.json(result);
}

// get one product by id by USER/OWNER
async function getProductsById(req, res, next) {
  let products = await product.read({ _id: req.params.id });
  let result = {
    count: products.length,
    results: products,
  };
  if (req.user) {
    if (req.user.id) {
      products.userID = req.user.id;
      let viewed = await viewedModel.create(products);
      // res.json(viewed);
    }
  } else {
    res.json(result);
  }
}

// update each product by id by OWNER
async function updateProducts(req, res, next) {
  try {
    let id = req.params.id;
    const data = await product.update(id, req.body);
    res.json(data);
  } catch (e) {
    next(e.message);
  }
}

// delete each product by id by OWNER
async function deleteProducts(req, res, next) {
  try {
    let id = req.params.id;
    await product.delete(id);
    res.json('Product is Deleted');
  } catch (e) {
    next(e.message);
  }
}

// get all products for each store by store id by OWNER/USER
async function getStoreProducts(req, res, next) {
  let storeProducts = await product.read({ storeID: req.params.storeID });
  let results = {
    count: storeProducts.length,
    results: storeProducts,
  };
  res.json(results);
}
async function getMainProducts(req, res, next) {
  try {
    let ranked = await product.rank();
    let onSale = await product.onSale();
    let newest = await product.newest();
    res.json({ ranked, onSale, newest });
  } catch (e) {
    next(e.message);
  }
}

module.exports = {
  addProductsHandler,
  getProducts,
  getProductsById,
  updateProducts,
  deleteProducts,
  getStoreProducts,
  getMainProducts,
};
