'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Trip Schema
 */
var TripSchema = new Schema({
  name: String,
  start: Date,
  stop: Date,
  phone: String,
  email: String,
  track: [{
      lat : String,
      lng: String,
      time: Date
  }]
});

/**
 * Validations
 */
TripSchema.path('name').validate(function (n) {
  return (n  && n.length>2);
}, 'Name is too short');

mongoose.model('Trip', TripSchema);
