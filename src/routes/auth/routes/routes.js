'use strict';
const express = require('express');
const router = express.Router();
const BasicAuth = require('../../../middlewares/auth/basic.js');
const Bearer = require('../../../middlewares/auth/bearer.js');
const {
  signup,
  signin,
  facebookLogin,
  googleLogin,
  confirmUser,
  forgetPassword,
  sendResetPasswordForm,
  resetPassword,
} = require('../apis/apis.js');
const usersModel = require('../../../DB/users/user-model');
const oauth = require('../../../middlewares/auth/googleOauth');

// sign up and sign in for users
router.route('/').post(signup).get(BasicAuth, signin);
router.route('/check').get(Bearer('none'), (req, res, next) => {
  // res.json(req.user);
  res.json({ data: req.user, acl: { acl: req.user.acl } });
});
// facebook login and save user data to database
router.route('/facebook').post(facebookLogin);

router.get('/confirmtion/:token', confirmUser);
router.route('/resetpassword/:token').get(sendResetPasswordForm);
router.route('/resetpassword').put(resetPassword).post(forgetPassword);
// for testing the users
router.route('/users').get((req, res, next) => {
  usersModel.read().then((data) => {
    data.forEach((user) => {
      console.log(user.review);
    });
    res.json({ count: data.length, users: data });
  });
});

router.route('/oauth').get(oauth, googleLogin);

module.exports = router;
