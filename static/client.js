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
		console.log(event);
	};
	input.onchange = input.oninput;
}

alert("Hello world!");
