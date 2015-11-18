var express = require('express');
var mongoose = require('mongoose');
var body_parser = require('body-parser');
var morgan = require('morgan');
var note = require('./db_note');

var token = require('./token.js')
//mongoose.connect('mongodb://root:123456@ds053784.mongolab.com:53784/rsc-test');
mongoose.connect('192.168.3.105:27017/test');

var app = express();
app.all("*", function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Content-Length, Accept");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    next();
});
app.use(express.static(__dirname + "/views"));
app.use(body_parser.urlencoded({extended: true}));
app.use(body_parser.json());
app.use(morgan('tiny'));




app.use('/account', require('./api_account')());
app.use('/note', require('./api_note')());
app.use('*', function (req, res) {
    res.sendFile(__dirname + '/views/index.html')
});

var server = require('http').createServer(app);


var io = require('socket.io')(server);
io.on('connection', function (socket) {
    socket.emit('news', {hello: 'world'});

    socket.on('getAllNotes', function (data) {
        token.verify(data.token, function (error, data) {
            note.find({username: data.username}, function (err, result) {
                if (err) {
                    socket.emit('pushAllNotes', []);
                }
                else {
                    socket.emit('pushAllNotes', result);
                }
            });
        })
    });

    socket.on('disconnect', function () {
        console.log('user disconneted')
    })
});

var port = 18080;
server.listen(port, function (err, res) {
    if (err) {
        console.log('listen ' + port + ' err!');
    } else {
        console.log('listen ' + port + ' ok!');
    }
});
