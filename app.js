var express = require('express');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var data = {};

io.on('connection', function(socket) {
	var ip = socket.request.connection.remoteAddress;
	console.log("Connect from " + ip);

	socket.on('form-update', function(data) {
		/*
		 * {
		 * 	url,
		 * 	input: {
		 *			name,
		 *			type,
		 *			value
		 * 	}
		 */
		console.log("Received form-update from " + ip);
		console.log(data);
		socket.broadcast.emit('form-update', data);
	});

	socket.on('disconnect', function() {
		console.log("Disconnect from " + ip);
	});
});

var port = 8080;

app.use(express.static(__dirname + '/static'));

server.listen(port);
console.log("Listening on port " + port);