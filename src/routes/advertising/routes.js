'use strict';
const express = require('express');
const router = express.Router();
const Advertising = require('../../DB/schemas/advertising.schema');

// sign up and sign in for users
router
  .route('/advertising')
  .get(async (req, res, next) => {
    let count = await Advertising.count();
    // Get a random entry
    let random = Math.floor(Math.random() * count);
    let recorde = await Advertising.find().skip(random).limit(5);
    let ids = recorde.map((obj) => obj._id);
    await Advertising.updateMany(
      { _id: { $in: ids } },
      { $inc: { count: -1 } }
    );
    res.json(recorde);
  })
  .post(async (req, res, next) => {
    const record = new Advertising(req.body);
    let saved = await record.save();
    res.json(saved);
  });

module.exports = router;
