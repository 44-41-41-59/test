/* eslint-disable comma-dangle */
'use strict';
const { userCollection } = require('../../../DB/users/user-model.js');
const fetch = require('node-fetch');
const userSchema = require('../../../DB/users/user-schema.js');
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');

// sign up function
async function signup(req, res, next) {
  let record;
  // try {
  //   let check = await userCollection.read(req.body);
  //   if (check.status === 401) {
  //     record = await userCollection.create(req.body);
  //     req.acl = {
  //       acl: record.acl.capabilities,
  //     };

  //     res.json({ data: record, acl: req.acl });
  //   } else {
  //     throw Error('user already signed up');
  //   }
  const output = `
    <h1>HELLO FROM DAAY-mall team its work yeah😍😍😊🥰</h1>
  `;

  // const output = `
  //     <p>You have a new contact request</p>
  //     <h3>Contact Details</h3>
  //     <ul>
  //       <li>Name: ${req.body.name}</li>
  //       <li>Company: ${req.body.company}</li>
  //       <li>Email: ${req.body.email}</li>
  //       <li>Phone: ${req.body.phone}</li>
  //     </ul>
  //     <h3>Message</h3>
  //     <p>${req.body.message}</p>
  //   `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    // host: 'mail.google.com',
    // port: 587,
    // secure: false, // true for 465, false for other ports
    service: 'gmail',
    auth: {
      // xoauth2: xoauth2.createXOAuth2Generator({
      user: 'eng.yazanalaiwah@gmail.com', // generated ethereal user
      pass: 'yazan55235570', // generated ethereal password
      // }),
    },
    // tls: {
    //   rejectUnauthorized: false,
    // },
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"DAAY-mall" <eng.yazanalaiwah@gmail.com>', // sender address
    to: 'eng.yazanalaiwah@gmail.com', // list of receivers
    subject: 'DAAY-mall test', // Subject line
    text: 'Hello world?', // plain text body
    html: output, // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    res.send('contact');
  });
  // } catch (e) {
  //   console.log({ status: 500, message: e.message });
  //   next({ status: 500, message: e.message });
  // }
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

module.exports = {
  signin,
  signup,
  facebookLogin,
  googleLogin,
};
