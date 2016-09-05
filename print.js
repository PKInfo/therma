printer = require('node-thermal-printer');

exports.connectPrinter = () => {
	// Initiate the connection to the printer.
	printer.init({
		type: 'epson',
		width: '48',
		ip: printerIP,
		port: printerPort
	});
};

exports.sendToPrinter = (quantity) => {
	// This tells the printer to cut the paper.
	// printer.cut();
	printer.partialCut();

	// Create an index variable.
	var i = 1 ;

	// // This insures that a quantity value was sent.
	if (quantity >= 1) {

		// While Loop
		while (i <= quantity) {
			printer.execute();
			i++;
		}
	}

	// CLEAR the print values.
	printer.clear();
};