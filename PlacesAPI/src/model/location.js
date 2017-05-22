var mongoose = require('mongoose');
var Address = require('./address');
var _ = require('lodash');

var schema = mongoose.Schema;
var locationSchema = new schema({
    userId:String,
    addresses : [Address]
});

locationSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;

        _.each(ret.addresses,function(address) {
            address['searchId'] = address._id;
            delete address._id;
        });
    }
});

module.exports = mongoose.model('location',locationSchema);
