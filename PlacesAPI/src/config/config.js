'use strict';

var path = require('path');
var fs = require('fs');
var _ = require('lodash');

var all = {
  env : process.env.NODE_ENV || 'development',
  port : process.env.PORT || 9000,
  secretKey: 'f+GUvV+tBoHp5MZ3d7vx2wzaY17Cj0tnRbfTfqSWtdsqRh6IoIrIxDIulNx1EtNBLS1hnhoKbLh'
};

var config;
var fileName = path.join(__dirname, all.env + '.json');
var data = fs.readFileSync(fileName,'utf8');
config = JSON.parse(data);
module.exports = _.merge(all, config);
