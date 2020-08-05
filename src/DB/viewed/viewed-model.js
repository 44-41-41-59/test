'use strict';

const viewedtSchema=require('./viewed-schema');

class viewedModel {
  constructor(schema){
    this.schema=schema;
  }
  async create(record) {
    let newRecord = new this.schema(record);
    return await newRecord.save();
  }
  async read(query){
    return this.schema.find(query).populate('products');
  }
}

module.exports = new viewedModel(viewedtSchema);