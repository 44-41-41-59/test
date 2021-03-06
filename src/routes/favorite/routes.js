/* eslint-disable comma-dangle */
'use strict';

const express = require('express');
const router = express.Router();
const bearer = require('../../middlewares/auth/bearer');
const permissions = require('../../middlewares/auth/authorize');
const { getFavorite, addFavorite, deleteFavorite } = require('./favorites');

router
  .route('/favorite')
  .post(bearer('registered'), permissions('addToFavorite'), addFavorite);
router
  .route('/favorite/:id')
  .delete(
    bearer('registered'),
    permissions('deleteFromFavorite'),
    deleteFavorite
  )
  .get(bearer('registered'), getFavorite);

module.exports = router;
