'use strict';

const express = require('express');
const router = express.Router();
const { getUserWishlist, addProductsToWishlist,  updateWishlist, deleteFromWishlist} = require('./wishlist');

// get all items of wishlist for one user//post an item to the wishlist of the user
router.route('/wishlist').get(getUserWishlist).post(addProductsToWishlist);
router.route('/wishlist/:id').put(updateWishlist).delete(deleteFromWishlist);

module.exports = router;