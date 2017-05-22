var locationRepo = require('../repository/locationRepository');

exports.updateSearch = (userId, locationRequest, callback) => {
    console.log('updateSearch called in locationService');
    locationRepo.update(userId, locationRequest, (err, data) => {
        callback(err, data);
    });
};

exports.getSearches = (userId, callback) => {
    console.log('getSearches called in locationService');
    locationRepo.findById(userId, (err, data) => {
        if (err) {
            callback(err);
            console.log('findById in location repository returned error', err);
        }
        if (data !== undefined) {
            callback(err, data);
        }
    });
};