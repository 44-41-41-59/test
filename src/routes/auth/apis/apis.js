/* eslint-disable comma-dangle */
'use strict';
require('dotenv').config();
const { userCollection } = require('../../../DB/users/user-model.js');
const fetch = require('node-fetch');
const userSchema = require('../../../DB/users/user-schema.js');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || 'daayMallToken';
const bcrypt = require('bcryptjs');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'eng.yazanalaiwah@gmail.com',
    pass: 'yazan55235570',
  },
});

function resetPasswordOutPut(token, name) {
  return `
  <h1>Hello ${name}, We are Daay-mall team!</h1>
  <p>You told us you forgot your password. If you really did click here to choose a new one</p>
  <a href='http://localhost:3000/auth/resetpassword/${token}'>Reset Password</a>
  <p>If you didn't mean to reset your password, then you can just ignore this email your password will not change</p>
`;
}

function getEmailToken(email) {
  const userToken = jwt.sign({ email }, SECRET, { expiresIn: '1d' });
  return userToken;
}
function getUserIdToken(id) {
  const userToken = jwt.sign({ id }, SECRET, { expiresIn: '1d' });
  return userToken;
}

function EmailOutPut(token) {
  return `
  <h1>Welcome!</h1>
  <p>Thanks for signing up! We just need you to verify your email address to complete setting up your account</p>
  <a href='http://localhost:3000/auth/confirmtion/${token}'>Verify My Email</a>
`;
}

function getMailOptionsForResetPassword(id, email, name) {
  let userIdToken = getUserIdToken(id);
  return {
    from: '"DAAY-mall" <eng.yazanalaiwah@gmail.com>', // sender address
    to: email, // list of receivers
    subject: 'Reset Password', // Subject line
    text: 'Hello world?', // plain text body
    html: resetPasswordOutPut(userIdToken, name), // html body
  };
}

function getMailOptionsForConfirmEmail(email) {
  let emailToken = getEmailToken(email);
  return {
    from: '"DAAY-mall" <eng.yazanalaiwah@gmail.com>', // sender address
    to: email, // list of receivers
    subject: 'verify email', // Subject line
    text: 'Hello world?', // plain text body
    html: EmailOutPut(emailToken), // html body
  };
}

// sign up function
async function signup(req, res, next) {
  let mailOptions = getMailOptionsForConfirmEmail(req.body.email);
  try {
    let check = await userCollection.read(req.body);
    if (check.status === 401) {
      let mailRecorde = await transporter.sendMail(mailOptions);
      let record = await userCollection.create(req.body);
      req.acl = {
        acl: record.acl.capabilities,
      };
      res.json({ data: record, acl: req.acl });
    } else {
      throw Error('user already signed up');
    }
  } catch (e) {
    console.log({ status: 500, message: e.message });
    next({ status: 500, message: e.message });
  }
}

// sign in function
async function signin(req, res, next) {
  let record = await userCollection.read(req.body);
  if (typeof record !== 'string') {
    req.acl = {
      acl: record.acl.capabilities,
    };
    res.cookie('token', record.token);

    res.json({ data: record, acl: req.acl });
  } else {
    next(record);
  }
}

// facebook login function
async function facebookLogin(req, res) {
  const { accessToken, userID } = req.body;
  const response = await fetch(
    `https://graph.facebook.com/v7.0/10216983614326453/?access_token=${accessToken}&fields=id%2Cname%2Cemail%2Cpicture&method=get&pretty=0&sdk=joey&suppress_http_code=1`
  );
  const json = await response.json();
  if (json.id === userID) {
    //valid user
    // check if the user exists in db else register and then login
    const resp = await userSchema.findOne({ facebookID: userID });
    if (resp) {
      //user is registered then create a session
      res.json({ status: 'ok', data: 'you are logged in' });
    } else {
      const person = {
        username: json.name,
        password: '' + Math.round(1000),
        email: json.email,
        avatar: json.picture.data.url,
        facebookID: userID,
        userSignInType: 'facebook',
      };
      userCollection.create(person);
      res.json({ status: 'ok', data: 'you are registered and logged in' });
    }
  } else {
    // invalid user warning
    res.json({ status: 'error', data: 'stop' });
  }
}

function googleLogin(req, res) {
  res.json({ token: req.token, user: req.user });
}

async function confirmUser(req, res, next) {
  try {
    const userEmail = await jwt.verify(req.params.token, SECRET);
    console.log('token', userEmail);
    let record = await userCollection.update(
      { email: userEmail.email },
      { confirmed: true }
    );
    console.log(record);
    res.send(record);
  } catch (e) {
    next({ status: 400, message: e.message });
  }
}
async function forgetPassword(req, res, next) {
  try {
    /// will have just the email in the body
    let { _id, email, username } = await userCollection.readForResetPassword(
      req.body
    );
    /**
     * you may update the resettoken in DB for more secure in future
     */
    let mailRecorde = await transporter.sendMail(
      getMailOptionsForResetPassword(_id, email, username)
    );
    res.send('helo');
  } catch (e) {
    next({ status: 401, message: e });
  }
}
function sendResetPasswordForm(req, res, next) {
  //// its should send the the reset form with the token or user information ask the team what is better
  res.send('form');
}

async function resetPassword(req, res, next) {
  try {
    //// you may change it if the data is not the token will be know in the front-end
    let userID = await jwt.verify(req.body.token, SECRET);
    let password = await bcrypt.hash(req.body.password, 6);
    let record = await userCollection.update({ _id: userID.id }, { password });
    res.json(record);
  } catch (e) {
    next({ status: 500, message: e.message });
  }
}

module.exports = {
  signin,
  signup,
  facebookLogin,
  googleLogin,
  confirmUser,
  forgetPassword,
  sendResetPasswordForm,
  resetPassword,
};
