'use strict';

const { favorite, store } = require('../../DB/collection-models');

function getFavorite(req, res, next) {
  favorite
    .read({ userID: req.user.id })
    .then((data) => res.json({ count: data.length, results: data }))
    .catch(next);
}

async function addFavorite(req, res, next) {
  try {
    let { storeID } = req.body;
    let userID = req.user.id;
    let search = await favorite.read({ userID, stores: storeID });
    if (search.length) {
      let record = await favorite.create({ userID, stores: storeID });
      res.json(record);
    } else {
      next({ status: 406, message: 'the store is alrady there' });
    }
  } catch (e) {
    next({ status: 500, message: e.message });
  }
}

function deleteFavorite(req, res, next) {
  let id = req.params.id;
  favorite
    .delete(id)
    .then((record) => {
      res.json(record);
    })
    .catch(next);
}

module.exports = {
  getFavorite,
  addFavorite,
  deleteFavorite,
};
