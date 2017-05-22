var userRepo = require('../repository/userRepository');

exports.registerUser = (emailId, registrationRequest, callback) => {
    console.log('registerUser called in userRepo');
    var error = validateInput(registrationRequest);
    if (error !== null) {
        callback(error);
        return;
    }
    userRepo.register(emailId, registrationRequest, (err, data) => {
        callback(err, data);
    });
};

var validateInput = (registrationRequest) => {
    if ((registrationRequest.emailId !== undefined)
        && registrationRequest.password !== undefined) {
        return null;
    }
    else if(registrationRequest.emailId === undefined){
        return {statusCode: 400, message: 'EmailId is missing'};
    }
    else {
        return {statusCode: 400, message: 'Password is missing'};
    }
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