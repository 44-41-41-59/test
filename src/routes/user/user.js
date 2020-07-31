'use strict';
const { users } = require('../../DB/users/user-model');

async function getUser(req, res, next) {
  try {
    let userID = req.params.id;
    let data = await users.get({ _id:userID });
    res.json(data);
  } catch (e) {
    next(e.message);
  }
}

module.exports = {
  getUser,
};
 