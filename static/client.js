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
	var url = document.URL;

	var socket = io(GA_SHARE_URL);

	socket.emit('request-data', url);

	var processInput = function(input) {
		if(input.type === "textarea"
				|| input.type === "number"
				|| input.type === "select-one"
				|| input.type === "text") {
			document.getElementById(input.id).value = input.value;
		} else if(input.type === "radio") {
			document.getElementById(input.id).checked = true;
		} else if(input.type === "checkbox") {
			document.getElementById(input.id).checked = input.checked;
		}
	}

	socket.on('stored-data', function(data) {
		console.log("Received stored data");
		console.log(data);
		for(var inputName in data) {
			var input = data[inputName];
			processInput(input);
		}
	});

	socket.on('form-update', function(data) {
		console.log('Received form-update!');
		console.log(data);
		if(url === data.url) {
			var input = data.input;
			processInput(input);
		} else {
			console.log("URL does not match!");
		}
	});

	var inputs = document.querySelectorAll('input, textarea, select');


	for(var i in inputs) {
		var input = inputs[i];
		input.oninput = function() {
			var event = {
				url: url,
				input: {
					id: this.id,
					name: this.name,
					type: this.type,
					checked: this.checked,
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

