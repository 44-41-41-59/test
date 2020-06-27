'use strict';
const express = require('express');
const router = express.Router();
const Roles = require('../../../DB/schemas/roles');
const payments = require('../../../DB/adminPaymentHistory/admin-payment-history.model.js');
const {order} = require('../../../DB/collection-models.js');




async function addComplaint(req, res, next){
  try{
    let orderID = [];
    let _id;
    let adminOrder = await payments.read({ paymentsHistory:  req.body.paymentHistoryID});
    console.log(adminOrder);
    for(let i = 0; i < adminOrder.orders.length;i++){
      let index = adminOrder.orders[i].products.includes(req.body.productID);
      if(index) {
        _id = adminOrder._id;
        orderID = adminOrder.orders[i]._id;
        adminOrder.invalid.push(adminOrder.orders[i]._id);
        adminOrder.orders.splice(i,1);
      }
    }

    let update = await payments.update({_id},adminOrder);
    let record =  await order.update(orderID,{status:'bolcked'});
    res.send(`we block the orders with ids ${orderID} and informe the store with id ${record._id} `);
  }catch(e){
    console.log(e.message);
    next({status:500,message:e.message});
  }

}

router.route('/complaint').patch(addComplaint);
router.route('/post/roles').post(async (req, res, next) => {
  try {
    let roles = {
      user: ['addToWishlist', 'deleteFromWishlist', 'addReview', 'updateReview',
        'deleteReview', 'checkoutCart', 'readPaymentHistory', 
        'deletePaymentHistory', 'addToFavorite', 'deleteFromFavorite',
        'addCart', 'updateCart', 'deleteCart', 'readUserCart',
      ],
      owner: [
        'createStore', 'updateStore', 'deleteStore', 'createProduct', 'updateProduct', 'deleteProduct', 'readOrders', 'updateOrder', 'deleteOrder',
      ],
      admin: ['deleteStore', 'updateStoreStatus', 'readPendingStores', 'readOrders',
      ],
    };
    for (let key in roles) {
      let record = new Roles({ role: key, capabilities: roles[key] });
      record = await record.save();
    }
    res.send('All roles has been added successfully');
  } catch (e) {
    next({ status: 500, message: e.message });
  }
});

module.exports = router;
