'use strict';

const express = require('express');
const router = express.Router();
const { getUserWishlist, addProductsToWishlist, deleteFromWishlist} = require('./wishlist');

//post an item to the wishlist of the user
router.route('/wishlist').post(addProductsToWishlist);
// update or delete one wishlist item
router.route('/wishlist/:id').delete(deleteFromWishlist);
// get all items of wishlist for one user
router.route('/wishlist/user/:userID').get(getUserWishlist);

module.exports = router;