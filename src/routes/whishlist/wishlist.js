'use strict';
const { wishlist } = require('../../DB/collection-models');

async function getUserWishlist(req, res, next) {
  try {
    let userID = req.user.id;
    let data = await wishlist.read({ userID });
    res.json(data);
  } catch (e) {
    next(e.message);
  }
}

async function addProductsToWishlist(req, res, next) {
  let { productID } = req.body;
  let userID = req.user.id;
  try {
    let data = await wishlist.create({ userID, productID });
    res.json(data);
  } catch (e) {
    next(e.message);
  }
}

async function deleteFromWishlist(req, res, next) {
  try {
    let id = req.params.id;
    await wishlist.delete(id);
    res.json('Item is Deleted');
  } catch (e) {
    next(e.message);
  }
}

module.exports = {
  getUserWishlist,
  addProductsToWishlist,
  deleteFromWishlist,
};
