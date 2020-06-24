'use strict';

const express = require('express');
const router = express.Router();
const bearer = require('../../middlewares/auth/bearer');
const permissions= require('../../middlewares/auth/authorize');
const { getUserWishlist, addProductsToWishlist, deleteFromWishlist} = require('./wishlist');

//post an item to the wishlist of the user // bearer // permission create wishlist item
router.route('/wishlist').post(bearer('registered'), permissions('addToWishlist'), addProductsToWishlist);
// update or delete one wishlist item // bearer // permission delete wishlist item
router.route('/wishlist/:id').delete(bearer('registered'), permissions('deleteFromWishlist'), deleteFromWishlist);
// get all items of wishlist for one user // public
router.route('/wishlist/user/:userID').get(getUserWishlist);

module.exports = router;