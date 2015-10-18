var express = require('express');
var fs = require('fs');

var httpsOptions = {
	key: fs.readFileSync(__dirname + '/server.key'),
	cert: fs.readFileSync(__dirname + '/server.crt')
}

var app = express();
var server = require('https').createServer(httpsOptions, app);
var io = require('socket.io')(server);

var storedData = {};

io.on('connection', function(socket) {
	var ip = socket.request.connection.remoteAddress;
	console.log("Connect from " + ip);

	socket.on('request-data', function(pageUrl) {
		response = storedData[pageUrl];
		console.log("Request-data");
		console.log(pageUrl);
		console.log(response);
		socket.emit('stored-data', response);
	});

	socket.on('form-update', function(data) {
		/*
		 * {
		 * 	url,
		 * 	input: {
		 * 		id,
		 *			name,
		 *			type,
		 *			value,
		 *			checked
		 * 	}
		 */
		console.log("Received form-update from " + ip);
		console.log(data);
		socket.broadcast.emit('form-update', data);
		if(!storedData[data.url]) {
			storedData[data.url] = {};
		}
		storedData[data.url][data.input.name] = data.input;
	});

	socket.on('disconnect', function() {
		console.log("Disconnect from " + ip);
	});
});

var port = 8080;

app.use(express.static(__dirname + '/static'));

server.listen(port);
console.log("Listening on port " + port);
