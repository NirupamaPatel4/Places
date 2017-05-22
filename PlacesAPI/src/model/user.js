var mongoose = require('mongoose');

var schema = mongoose.Schema;
var userSchema = new schema({
    name : String,
    userId:String,
    emailId:String,
    password : String
});

userSchema.set('toJSON', {
    transform: function (doc, ret) {
        ret.userId = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model('user',userSchema);
