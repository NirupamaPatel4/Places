var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/placesdb',{ server : { w : 1} });
var db = mongoose.connection;
db.once('open', function () {
    console.log('MongoDB Connected!');
});

var app = express();

var cors = require('cors');

// use it before all route definitions
app.use(cors({origin: 'http://localhost:3001'}));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Access-Token,DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Expose-Headers', 'Access-Token,Authorization');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use('/', require('./routes/routes'));

app.listen(9000);
console.log("Listening on port 9000");

module.exports = app;
