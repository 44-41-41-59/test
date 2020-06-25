/* eslint-disable comma-dangle */
'use strict';

require('@code-fellows/supergoose');

const { userCollection } = require('../../src/DB/users/user-model.js');
let obj = {
  username: 'yazan',
  email: '6',
  password: '0000',
  role: 'user',
};
let resulte = {
  data: {
    avatar:
      'https://i2.wp.com/www.cycat.io/wp-content/uploads/2018/10/Default-user-picture.jpg',
    role: 'user',
    userSignInType: 'auth',
    paymentsHistory: [],
    _id: '5ef300fefef4be10803b42bd',
    username: 'yazan',
    email: '6',
    __v: 0,
  },
  acl: {
    acl: [
      'addToWishlist',
      'deleteFromWishlist',
      'addReview',
      'updateReview',
      'deleteReview',
      'checkoutCart',
      'readPaymentHistory',
      'deletePaymentHistory',
      'addToFavorite',
      'deleteFromFavorite',
      'addCart',
      'updateCart',
      'deleteCart',
      'readUserCart',
    ],
  },
};
describe('Cart Model', () => {
  it('create user', () => {
    return userCollection
      .create(obj)
      .then((result) => {
        console.log(result, 'bobo');
        return expect(result).toMatchObject(resulte);
      })
      .catch((e) => console.log('hello', e.message));
  });
});
