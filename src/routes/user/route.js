'use strict';
const express = require('express');
const router = express.Router();
const { getUser } = require('../user/user');

router
  .route('/user/:id')
  .get(getUser);

module.exports = router;
