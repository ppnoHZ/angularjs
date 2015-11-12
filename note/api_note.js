var express = require('express');
var note = require('./db_note');
var token = require('./token');

module.exports = function(){
    var api = express.Router();

    api.use(function(req, res, next){
        var tokenData = req.body.token || req.params.token || req.headers['x-access-token'];
        if(tokenData)
        {
            console.log(tokenData);
            console.log(req.body);
            token.verify(tokenData,function(err,decoded)
            {
                if(err)
                {
                    res.send({status:'auth_failed'});
                    return;
                }
                req.decoded = decoded;
                console.log(decoded)
                next();
            });
        }
        else
        {
            res.send({status:'no_token'});
        }
    });

    api.post('/add', function(req, res){
        var text = req.body.text;
        if((typeof(text) != 'string' || !text || text.length == 0)){
            res.send({status:'params err'});
            return;
        }

        var newTest = new note({
            username: req.decoded.username,
            text: text
        });
        newTest.save(function(err, result){
            if(err){
                res.send({status:'err'});
            }else{
                res.send({status:'success', res:result});
            }
        });
    });

    api.post('/find', function(req, res){
        note.find({username:req.decoded.username}, function(err, result){
            if(err){
                res.send({status:'err'});
                return;
            }
            res.send({
                status:'success',
                notes:result
            });
        });
    });

    return api;
};


