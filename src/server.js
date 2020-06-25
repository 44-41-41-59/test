'use strict';
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const notFound = require('./middlewares/errors/not-found.js');
const errorHandeler = require('./middlewares/errors/server-error.js');
const auth = require('./routes/auth/routes/routes.js');
const seedRoles = require('./routes/seedRoles/routes/routes.js');
const productsRoute = require('./routes/products/routes');
const reviewsRoute = require('./routes/reviews/router.js');
const storeRoutes = require('./routes/store/routes.js');
const favoriteRoutes = require('./routes/favorite/routes.js');
const cartRoutes = require('./routes/cart/routes.js');
const whishlistRoutes = require('./routes/whishlist/routes.js');
const pay = require('./routes/payment/routes.js');
const orderRoutes = require('./routes/store/orders/routes.js');
const paymentHistory = require('./routes/payment/payment-history/routes.js');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));

// sign in - sign up route
app.use('/auth', auth);
// used to seed the roles into the database one time
app.use('/admin', seedRoles);
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
app.use(pay);
// orders routes
app.use(orderRoutes);
// payment history routes
app.use(paymentHistory);

app.use('*', notFound);
app.use(errorHandeler);

module.exports = {
  server: server,
  start: (port) => {
    server.listen(port);
  },
};

let clientsQueue = [];
let custmerRoom = {};
io.on('connection', (socket) => {
  socket.on('massege', (room, message, id) => {
    io.in(room).emit('masseage', { message, id });
  });

  socket.on('error', (payload) => {
    console.log('error', payload);
  });
  socket.on('admin', (name, room) => {
    custmerRoom[room] = { status: true, name };
    socket.join(room);
    setTimeout(() => {
      loop();
    }, 1000);
  });
  socket.on('next', (room) => {
    if (custmerRoom[room]) custmerRoom[room].status = true;
    setTimeout(() => {
      loop();
    }, 1000);
  });
  socket.on('admindisconecct', (room) => {
    delete custmerRoom[room];
  });
  socket.on('userConnected', async (name) => {
    clientsQueue.push(socket);

    if (!loop()) socket.emit('wait', {});
  });
  socket.on('userDisconnected', (room) => {
    socket.leave(room.room);
    io.in(room.room).emit('next', room.room);
  });
});

function loop() {
  if (clientsQueue.length) {
    for (let room in custmerRoom) {
      if (custmerRoom[room].status) {
        let name = custmerRoom[room].name;
        let socket = clientsQueue.shift();
        socket.join(room);
        socket.emit('joinded', { room, name });
        custmerRoom[room].status = false;
        return room;
      }
    }
    return false;
  }
}
