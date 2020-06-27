'use strict';
const user = require('../../DB/users/user-schema.js');
module.exports = (type) => {
  return async (req, res, next) => {
    try {
      if (type === 'none') {
        if (req.headers.authorization) {
          const [auth, token] = req.headers.authorization.split(' ');
          if (auth === 'Bearer') {
            let record = await user.authenticateToken(token);
            req.user = {
              username: record.username,
              acl: record.acl,
              capabilities: record.acl.capabilities,
              id: record._id,
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
              console.log(record, 'sdlkfjlkd');

              req.user = {
                username: record.username,
                acl: record.acl,
                capabilities: record.acl.capabilities,
                id: record._id,
              };
              console.log(req.user, 'sdlkfjlkd');
            } else {
              next({ status: 401, message: 'Invalid auth header' });
            }
          }
          next();
        } catch (e) {
          next({ status: 500, message: e.message });
        }
      }
    } catch (e) {
      next(e.message);
    }
  };
};
