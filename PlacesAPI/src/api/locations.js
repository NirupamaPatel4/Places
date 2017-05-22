var locationservice = require('../service/locationService');
var _ = require('lodash');

exports.post = function (req, res) {
    var userId = req.params.userId;
    var request = {
        userId : userId,
        addresses : [{
            searchedOn : Date.now(),
            address : req.body.address
        }]
    };
    locationservice.updateSearch(userId, request, (err, data) => {
    if(err){
      res.status(getStatusCode(err)).send(err);
    }
    res.send(data);
  });
};

exports.get = function (req, res) {
    var userId = req.params.userId;
    locationservice.getSearches(userId, (err, data) => {
      if (err) {
        res.status(getStatusCode(err)).send(err.message);
      }
      else {
        res.send(data);
      }
    });
};

var getStatusCode = (error) => {
  var statusCode = 500;
  if (error.statusCode !== undefined)
  {
    statusCode = error.statusCode;
  }
  return statusCode;
};

