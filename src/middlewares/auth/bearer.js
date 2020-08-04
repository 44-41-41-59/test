'use strict';
const user = require('../../DB/users/user-schema.js');
const { cart ,payment} = require('../../DB/collection-models');
module.exports = (type) => {
  return async (req, res, next) => {
    try {
      console.log('hello from cart');
      if (type === 'none') {
        if (req.headers.authorization) {
          const [auth, token] = req.headers.authorization.split(' ');
          if (auth === 'Bearer' && token !== 'undefined') {
            let record = await user.authenticateToken(token);
            let cartReacord = await cart.read({userID:record._id})
            let paymentsHistory = await payment.read({userID:record._id})
            console.log(paymentsHistory,'hello form the cart fixed')
            req.user = {
              username: record.username,
              acl: record.acl.capabilities,
              capabilities: record.acl.capabilities,
              cart:cartReacord,
              _id: record._id,
              email: record.email,
              avatar: record.avatar,
              role: record.role,
              confirmed: record.confirmed,
              stores:record.stores,
              wishlist:record.wishlist,
              paymentsHistory,
            };
            next();
          } else {
            next();
          }
        } else {
          next();
        }
      } else if (type === 'registered') {
        try {
          if (!req.headers.authorization) {
            next({ status: 401, message: 'Invalid Login no auth headers' });
          } else {
            const [auth, token] = req.headers.authorization.split(' ');
            if (auth === 'Bearer') {
              let record = await user.authenticateToken(token);

              req.user = {
                username: record.username,
                acl: record.acl.capabilities,
                capabilities: record.acl.capabilities,
                _id: record._id,
                email: record.email,
                avatar: record.avatar,
                role: record.role,
                confirmed: record.confirmed,
                password: record.password,
              };
            } else {
              next({ status: 401, message: 'Invalid auth header' });
            }
          }
          next();
        } catch (e) {
          console.log('1');
          next({ status: 500, message: e.message });
        }
      }
    } catch (e) {
      console.log('2');
      next(e.message);
    }
  };
};
