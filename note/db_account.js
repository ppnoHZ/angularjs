var mongoose = require('mongoose');

var Account = new mongoose.Schema({
    username: {type:String, required:true, unique:true},
    nickName: {type:String, required:true},
    password: {type:String, required:true}
});

module.exports = mongoose.model('user', Account);