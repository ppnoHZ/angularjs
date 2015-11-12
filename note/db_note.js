var mongoose = require('mongoose');

var Note = new mongoose.Schema({
    username: {type:String, required:true},
    text: {type:String, required:true},
    createAt:{
        type:Date,default:Date.now
    }
});

module.exports = mongoose.model('note', Note);