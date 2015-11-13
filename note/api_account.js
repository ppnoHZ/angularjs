var express = require('express');
var account = require('./db_account');
var note = require('./db_note');
var token = require('./token');

module.exports = function () {
    var api = express.Router();

    api.post('/signup', function (req, res) {
        var username = req.body.username;
        var password = req.body.password;
        var nickName = req.body.nickName;

        if ((typeof(username) != 'string' || !username || username.length == 0) ||
            (typeof(password) != 'string' || !password || password.length == 0) ||
            (typeof(nickName) != 'string' || !nickName || nickName.length == 0)) {
            res.send({status: 'params err'});
            return;
        }

        var newAccount = new account({
            username: username,
            password: password,
            nickName: nickName
        });

        newAccount.save(function (err) {
            if (err) {
                res.send({status: 'err'});
            } else {
                res.send({status: 'success', nickName: nickName, token: token.encode(username)});
            }
        });
    });

    api.post('/login', function (req, res) {
        var username = req.body.username;
        var password = req.body.password;

        account.findOne({username: username, password: password}, function (err, result) {
            if (err) {
                res.send({status: 'err'});
                return;
            }
            if (!result) {
                res.send(401, {status: 'not_found'});
                return;
            }
            res.send({status: 'success', nickname: result.nickName, token: token.encode(username)});
        });
    });

    api.use(function (req, res, next) {
        var tokenData = req.body.token || req.params.token || req.headers['x-access-token'];
        if (tokenData) {
            token.verify(tokenData, function (err, decoded) {
                if (err) {
                    res.send({status: 'auth_failed'});
                    return;
                }
                req.decoded = decoded;
                next();
            });
        }
        else {
            res.send({status: 'no_token'});
        }
    });

    api.post('/self', function (req, res) {
        account.findOne({username: req.decoded.username}, function (err, result) {
            if (err) {
                res.send({status: 'err'});
                return;
            }
            if (!result) {
                res.send({status: 'not_found'});
                return;
            }
            res.send({status: 'success', data: {username: result.username, nickName: result.nickName}});
        });
    });

    return api;
};