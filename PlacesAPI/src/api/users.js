var userservice = require('../service/userService');
var jwt = require('jsonwebtoken');
var config = require('../config/config.js');
var _ = require('lodash');

exports.post = function (req, res) {
    console.log('reached here!!');
    var emailId = req.body.emailId;
    userservice.registerUser(emailId, req.body, (err, data) => {
        if(err){
            res.status(getStatusCode(err)).send(err);
        }
        else{
        // create a token
        var token = getAuthToken(emailId);
        console.log('token :', token);
        res.setHeader('Access-Token', token);
        res.send(data);}
    });
};

function getAuthToken(emailId) {
    var date = new Date();
    var expires = date.setDate(date.getDate() + 7);
    // var token = jwt.encode({
    //     iss: emailId,
    //     exp: expires
    // }, config.secretKey);
    var token = jwt.sign({
        data: emailId
    }, config.secretKey, { expiresIn: '1h' });
    // var token = jwt.sign(emailId, config.secretKey, {
    //     expiresIn: 60*60 // expires in 24 hours
    // });
    return token;
}

var getStatusCode = (error) => {
    var statusCode = 500;
    if (error.statusCode !== undefined)
    {
        statusCode = error.statusCode;
    }
    return statusCode;
};

