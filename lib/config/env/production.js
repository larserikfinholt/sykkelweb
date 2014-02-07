'use strict';

module.exports = {
  env: 'production',
  mongo: {
    uri: process.env.MONGOLAB_URI ||
         process.env.MONGOHQ_URL ||
         'mongodb://lef:leflef@ds027748.mongolab.com:27748/sykkeldb'
  }
};