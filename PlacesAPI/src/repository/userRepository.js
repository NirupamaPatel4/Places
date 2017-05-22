var mongoose = require('mongoose');
require('../model/user');
var user = mongoose.model('user');

exports.register = (emailId, registrationRequest, callback) => {
    var u = new user(registrationRequest);
    user.findOne({'emailId': emailId},function(err,res){
        if (err) {
            callback(err);
            return;
        }
        if (res) {
            if(res.password !== u.password)
                callback({statusCode: 401, message: 'Password does not match'});
            else
                callback(null, res);
        }
        else {
            u.save((err, data) => {
                if (err) {
                    callback(err);
                    return;
                }
                if (data !== undefined) {
                    data = data.toJSON();
                }
                callback(err, data);
            });
        }
    });
};
