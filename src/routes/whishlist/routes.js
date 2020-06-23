'use strict';

const express = require('express');
const router = express.Router();
const { getUserWishlist, addProductsToWishlist, deleteFromWishlist} = require('./wishlist');

//post an item to the wishlist of the user // bearer // permission create wishlist item
router.route('/wishlist').post(addProductsToWishlist);
// update or delete one wishlist item // bearer // permission delete wishlist item
router.route('/wishlist/:id').delete(deleteFromWishlist);
// get all items of wishlist for one user // public
router.route('/wishlist/user/:userID').get(getUserWishlist);

module.exports = router;