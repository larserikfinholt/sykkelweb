'use strict';

var mongoose = require('mongoose'),
    Trip = mongoose.model('Trip');

/**
 * Start a new trip
 */
exports.startNew = function (req, res, next) {
    console.log('req', req);
  var newTrip = new Trip(req);
  newTrip.start = new Date();
  newTrip.name = req.params.name;

  newTrip.save(function (err) {
      console.log('saved', newTrip);
    if (err) {
      // Manually provide our own message for 'unique' validation errors, can't do it from schema
      return res.json(400, err);
    }
    return res.json(newTrip);
  });
};

exports.stop = function (req, res, next) {
    var tripId = req.params.tripId;

    Trip.findById(tripId, function (err, trip) {

        if (err) {
            return res.send(404, 'TRIP_NOT_FOUND');
        }
        trip.stop = Date.now;
        trip.save(function (err) {
            if (err) { 
                return res.send(500, 'ERROR_UPDATING_TRIP');
            }
            return res.json(200, "OK");
        });
    });
};

exports.addPosition = function (req, res, next) {
    var tripId = req.params.tripId,
        lat = req.params.lat,
        lng = req.params.lng;

    Trip.findById(tripId, function (err, trip) {

        if (err) {
            return res.send(404, 'TRIP_NOT_FOUND');
        }
        trip.positions.push({ lat:lat, lng:lng, time: Date.now });
        trip.save(function (err) {
            if (err) {
                return res.send(500, 'ERROR_ADDING_TRIP_POSITION');
            }
            return res.json(200, "OK");
        });
    });
};


exports.get = function (req, res, next) {
    var id = req.params.id;

    Trip.findById(id, function (err, trip) {
        if (err) {
            return res.send(404, 'TRIP_NOT_FOUND');
        }
        res.send(trip);

    });
};


/**
 *  Get latest trips
 */
exports.latest = function (req, res, next) {
  var tripId = req.params.id;

  Trip.find({}, function (err, trips) {
    if (err) return next(new Error('Failed to load Trip'));
  
    if (trips) {
      res.send(trips);
    } else {
      res.send(404, 'TRIP_NOT_FOUND');
    }
  });
};
