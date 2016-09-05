var net = require("net");
// var printerIP = '192.168.77.27' ;
// var printerPort = '9100' ;
const therma = require('./app.js');

exports.checkConnection = () => {
	// connection is a socket object.
	connection = net.createConnection(printerPort, printerIP);

	connection.setTimeout(1000);

	connection.on('connect', function () {
		isConnected();
	});

	connection.on('timeout', function () {
		isNotConnected();
	});

	connection.on('error', function (err) {
		console.log(err.code);
	});
};

function isConnected () {
	console.log("Printer connected!");
	connection.end();
	therma.nextStep("Success");
};

function isNotConnected () {
	console.log("The printer isn't responding.")
	connection.end();
	therma.nextStep("Fail");
};