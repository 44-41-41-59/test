'use strict';
const express = require('express');
const router = express.Router();
const bearer = require('../../middlewares/auth/bearer');
const permissions= require('../../middlewares/auth/authorize');
const { addStore, editStore, deleteStore, getAllStores, getOneStore, getOwnerAllStores, getPendingStores} = require('./store.js');

// create new store by USER/ get all stores by USER // bearer and permission to create store // public
router.route('/store').post(bearer('registered'), permissions('createStore'), addStore).get(getAllStores);
// get all pending stores in the admin dashboard // bearer and permission to get admin dashboard
router.route('/store/admin/dashboard').get(bearer('registered'), permissions('readPendingStores'), getPendingStores);
// get all the stores owned by one owner by USER // public
router.route('/store/owner/:ownerID').get(getOwnerAllStores);
// get one store by store ID by USER public /  edit one store by OWNER permission update store / edit one store status by ADMIN edit store status permission/ delete one store by OWNER and ADMIN permission delete store
router.route('/store/:id').get(getOneStore).put(bearer('registered'), permissions('updateStore'), editStore).delete(bearer('registered'), permissions('deleteStore'), deleteStore).patch(bearer('registered'), permissions('updateStoreStatus'), editStore);

module.exports = router;