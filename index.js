var express = require('express');
var socket = require('socket.io');

var app = express();
var server = app.listen(3000, function () {
    console.log('Your server starts successfully.');
});

app.use(express.static('public_html'));

var io = socket(server);
io.on('connection', function (socket) {
    console.log('We have new visitor as id=>', socket.id);

    socket.on('new_message', function (new_message) {
        console.log('Visior ID: ', new_message.visitor_id);
        console.log('Visior Username: ', new_message.username);
        console.log('Visior Message: ', new_message.message);

        io.sockets.emit('new_msg', new_message);
    });

    socket.on('writting', function (writting) {
        console.log('user ' + writting.username + ' is writting');

        socket.broadcast.emit('new_writting',writting);
    });
});