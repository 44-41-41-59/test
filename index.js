'use strict';
require('dotenv');
const server = require('./src/server.js');
require('./src/socket.io/runTimeChat');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3001;
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/newdaaymall';
  // MONGODB_URI=mongodb://heroku_3m7wrf9f:qmlc7bdtjbskh4f08pljt1legs@ds217799.mlab.com:17799/heroku_3m7wrf9f

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

server.start(PORT);
