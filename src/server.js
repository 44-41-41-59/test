'use strict';
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const notFound = require('./middlewares/errors/not-found.js');
const errorHandeler = require('./middlewares/errors/server-error.js');
const auth = require('./routes/auth/routes/routes.js');
const seedRoles = require('./routes/seedRoles/routes/routes.js');
const seedProducts = require('./routes/products/seedProducts');
const productsRoute = require('./routes/products/routes');
const reviewsRoute = require('./routes/reviews/router.js');
const storeRoutes = require('./routes/store/routes.js');
const favoriteRoutes = require('./routes/favorite/routes.js');
const cartRoutes = require('./routes/cart/routes.js');
const whishlistRoutes = require('./routes/whishlist/routes.js');
const pay = require('./routes/payment/routes.js');
const orderRoutes = require('./routes/store/orders/routes.js');
const paymentHistory = require('./routes/payment/payment-history/routes.js');
const ad = require('./DB/adminPaymentHistory/admin-payment-history.model.js');
const advertising = require('./routes/advertising/routes.js');
const user = require('./routes/user/route');
const app = express();
const likes = require('./routes/likes/router.js');
const search = require('./routes/search/router.js');
const faker = require('faker');
const cors = require('cors');
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.json());
app.use(cors({ credentials: true }));
app.use(morgan('dev'));
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));

// sign in - sign up route
app.use('/auth', auth);
// used to seed the roles into the database one time
app.use('/admin', seedRoles);
// used to seed the products into the database one time
app.use('/admin', seedProducts);

// cart routes
app.use(cartRoutes);
// products routes
app.use(productsRoute);
// reviews routes
app.use(reviewsRoute);
// stores routes
app.use(storeRoutes);
// favorite routes
app.use(favoriteRoutes);
// whishlist routes
app.use(whishlistRoutes);
app.use(advertising);
app.use(pay);
// orders routes
app.use(orderRoutes);
// payment history routes
app.use(paymentHistory);
app.use(likes);
app.use(search);
app.use(user);


app.use('*', notFound);
app.use(errorHandeler);

module.exports = {
  io,
  server,
  start: (port) => {
    server.listen(port);
  },
};
