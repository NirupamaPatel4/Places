var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('../config/config.js');


var locationsapi = require('../api/locations');
var usersapi = require('../api/users');


router.post('/users', usersapi.post);
router.use(function(req, res, next) {
    // check header for token
    var token = req.headers['Authorization'] || req.headers['authorization'];

    // decode token
    if (token) {
        jwt.verify(token, config.secretKey, function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                req.decoded = decoded;
                next();
            }
        });

    } else {
        return res.status(401).send('Unauthorized access.');
    }
});

router.post('/users/:userId/locations', locationsapi.post);
router.get('/users/:userId/locations', locationsapi.get);
//router.get('/users/:userId', usersapi.get);





module.exports = router;
