var mongoose = require('mongoose');
require('../model/location');
var location = mongoose.model('location');


exports.update = (userId, locationRequest, callback) => {
    console.log('update in location repo called');
    console.log('locationRequest', locationRequest);
    var loc = new location(locationRequest);
    console.log('loc.addresses', loc.addresses[0]);
    location.findOneAndUpdate({'userId': userId},{$push: {"addresses": loc.addresses[0]}},{safe: true, upsert: true, new : true}, function(err, data) {
        if (err) {
            callback(err);
        }
        if (data !== undefined) {
            data = data.toJSON();
        }
        callback(err, data);
    });
};

exports.findById = (userId, callback) => {
    location.findOne({'userId': userId}, (err, locations) => {
    if (err) {
      callback(err);
      console.log('findOne in location repo returned error',err);
    }
    if (locations) {
      callback(err, locations);
    }
    else {
      callback(err);
    }
  });
};
