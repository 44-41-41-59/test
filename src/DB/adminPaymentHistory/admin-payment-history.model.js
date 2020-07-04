/* eslint-disable comma-dangle */
'use strict';
const moment = require('moment');
const schema = require('./admin-payment-history.schema.js');
const { CronJob } = require('cron');

class AdminPaymentHistory {
  constructor() {
    this.schema = schema;
  }
  read(queryObject = {}) {
    return this.schema.findOne(queryObject).populate('orders');
  }
  async create(obj) {
    let record = new this.schema(obj);
    let result = record.save();
    return result;
  }
  async update(_id, record) {
    return this.schema.findOneAndUpdate(_id, record, { new: true });
  }
  async removeLoop(step, type) {
    let obj = {
      minutes: `*/${step} * * * *`,
      hours: `* */${step} * * *`,
      days: `* * */${step} * *`,
    };
    console.log(obj[type]);
    var job = new CronJob(
      obj[type],
      function () {
        var older_than = moment().subtract(step, type).toDate();
        // // var older_than2 = moment().subtract(9, 'minutes').toDate();
        this.schema.updateMany(
          { Timestamp: { $lte: older_than } },
          { orders: [] },
          { new: true }
        );
        this.schema.remove({
          Timestamp: { $lte: older_than },
          invalid: { $exists: true, $size: 0 },
        });
      },
      null,
      true,
      'America/Los_Angeles'
    );
    job.start();
  }
}
module.exports = new AdminPaymentHistory();
