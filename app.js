var http = require("http");
var server = http.createServer();

// Modulerized Code
const check = require('./check.js');
const format = require('./format.js');
const print = require('./print.js');

// This catches errors.
process.on('uncaughtException', function (err) {
	console.log(err);
});

// The port that this node.js app is listening on.
var nodePort = 7777;

// This is the node server object.
server.on('request', function(request, response) {
	var headers = request.headers;
	var method = request.method;
	var url = request.url;

	// This captures the data and option variables fromt the url.
	theQ = require('url').parse(request.url, true).query;

	// Grab the quantity.
	quantity = theQ.quantity;

	// Grab the printer's ip address.
	// The printerIP and printerPort variable are globals 'because' there isn't a 'var' in front of them.
	printerIP = theQ.printerIP ;
	printerPort = '9100' ;

	// Step 1: Check the printer connection.
	// This step calls the subsquent steps.
	check.checkConnection ();

	exports.nextStep = (successfail) => {
		if (successfail == "Success") {
			print.connectPrinter();
			format.parseUrl(theQ);
			print.sendToPrinter(quantity);
			respond(successfail);
		} else {
			respond(successfail);
		};
	};

	// This sends the http response back to the browser.
	function respond (successfail) {
		if (successfail == "Success") {
			console.log("Print done");
			response.statusCode = 200;
			response.setHeader('Content-Type', 'text/plain');
			response.write("OK");
			response.end();
		} else {
			console.error("Print failed");
			response.statusCode = 400;
			response.setHeader('Content-Type', 'text/plain');
			response.write("PrinterError");
			response.end();
		};
	};

}).listen(nodePort);

// Terminal output when launched:
console.log(
	'\n\n' +
	"#######################################################"
	+ '\n' +
	"Therma is a node print server listening on port " + nodePort + "."
	+ '\n' +
	"#######################################################"
	+ '\n\n' +
	"Print requests are made by sending a formatted query string to the following url."
	+ '\n\n' +
	"URL:"
	+ '\n' +
	"http://raspi.local:" + nodePort + "/"
	+ '\n\n' +
	"Formatted Query String:"
	+ '\n' +
	"?printerIP=&quantity=&data1=&options1=&data2=&options2=&data3=&options3=&data4=&options4="
	+ '\n\n' +
	"Example URL:"
	+ '\n' +
	"http://raspi.local:" + nodePort + "/" + "?printerIP=192.168.77.27&quantity=1&data1=Black Beans (Prep)&options1=Medium&data2=Exp: Sat 9/3&options2=Large+BlackBackground&data3=Prep: Mon 8/29&options3=Large&data4=Justin&options4=Small"
	+ '\n\n'
);