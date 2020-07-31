'use strict';
const { store } = require('../../DB/collection-models');
const {users} = require('../../DB/users/user-model');

// get all stores in the website
function getAllStores(req, res, next) {
  store
    .read({ status: 'approved' })
    .then((data) => {
      res.json({ count: data.length, results: data, products: data.products });
    })
    .catch(next);
}
// get all stores in the website
function getOwnerAllStores(req, res, next) {
  store
    .read({ ownerID: req.user.id })
    .then((data) => res.json({ count: data.length, results: data }))
    .catch(next);
}
// USER get one store by id
function getOneStore(req, res, next) {
  store
    .read({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
}
// OWNER add new store
function addStore(req, res, next) {
  let storeData = {
    name: req.body.name,
    logo: req.body.logo,
    category: req.body.category,
    country: req.body.country,
    city: req.body.city,
    ownerID: req.user._id,
  };
  try {
    store
      .create(storeData)
      .then((data) => {
        users.update(req.user._id, {stores:data._id}).then(updated => {
          res.json(data);
        });
      })
      .catch(next);
  } catch (e) {
    res.send(e.message);
  }
}
// OWNER edit store detail by store id/ admin patch each store to change its status by store id
function editStore(req, res, next) {
  store
    .update({ _id: req.params.id }, req.body)
    .then((data) => res.json(data))
    .catch(next);
}
// OWNER delete store/ ADMIN delete store
function deleteStore(req, res, next) {
  // should also delete all products that has the store ID
  store
    .delete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
}
// get all pending stores in the admin dashboard
function getPendingStores(req, res, next) {
  store
    .read({ status: 'pending' })
    .then((data) => res.json(data))
    .catch(next);
}

module.exports = {
  getAllStores,
  getOwnerAllStores,
  getOneStore,
  addStore,
  editStore,
  deleteStore,
  getPendingStores,
};
