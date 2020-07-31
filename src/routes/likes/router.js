'use strict';

const express = require('express');
const bearer = require('../../middlewares/auth/bearer');
const Like = require('../../DB/schemas/likes.schema.js');
// const permissions = require('../../../middlewares/auth/authorize');

const router = express.Router();
// get all of the payment history for one user
const addLike = async (req, res, next) => {
  try {
    let record = '';
    if (req.body.productID) {
      record = new Like({
        userID: req.user._id,
        productID: req.body.productID,
      });
    } else {
      record = new Like({
        userID: req.user._id,
        sotreID: req.body.sotreID,
      });
    }
    console.log(record, 'record');
    let saved = await record.save();
    res.json(saved);
  } catch (e) {
    next(e.message);
  }
};
router.route('/likes').post(bearer('registered'), addLike);

module.exports = router;
