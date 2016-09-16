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
	i = 1;

	// // This insures that a quantity value was sent.
	if (quantity >= 1) {
		print(i);
	}
};

// Issue the print command to the printer.
function print (i) {
	setTimeout(function(){
		printer.execute();
		++i;
		if (i <= quantity) {
			print(i);
		} else {
			clearPrint();
		}
	}, 750);
};

// CLEAR the print values.
function clearPrint () {
	printer.clear();
};
