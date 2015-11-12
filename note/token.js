var jwt = require('jsonwebtoken');

var data = {};
var secretToken = 'testtest';

data.encode = function(username){
    return jwt.sign({username:username}, secretToken, {expiresIn: 60*60*24});
};

data.verify = function(token, cb){
    return jwt.verify(token, secretToken, cb);
};

module.exports = data;