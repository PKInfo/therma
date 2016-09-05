exports.parseUrl = (theQ) => {
	// Grab all possible data and option strings.
	var d1 = theQ.data1 ;
	var o1 = theQ.options1 ;
	var d2 = theQ.data2 ;
	var o2 = theQ.options2 ;
	var d3 = theQ.data3 ;
	var o3 = theQ.options3 ;
	var d4 = theQ.data4 ;
	var o4 = theQ.options4 ;
	var d5 = theQ.data5 ;
	var o5 = theQ.options5 ;

	// Output the data.
	printLine (d1,o1) ;
	printLine (d2,o2) ;
	printLine (d3,o3) ;
	printLine (d4,o4) ;
	printLine (d5,o5) ;
};

	// This funciton outputs the data variable to the print function.
function printLine (data,options) {

	// These are RegEx variables to test the option variables.
	var boldOption = /Bold/;
	var blackBackgroundOption = /BlackBackground/;
	var largeOption = /Large/;
	var mediumOption = /Medium/;
	var smallOption = /Small/;

	// If the BOLD option was specified.
	if (boldOption.test(options)) {
		printer.bold(true);
	} else {
		printer.bold(false);
	}

	// If the BLACK BACKGROUND option was specified.
	if (blackBackgroundOption.test(options)) {
		printer.invert(true);
	} else {
		printer.invert(false);
	}

	// If the DOUBLE HEIGHT option was specified.
	if (largeOption.test(options)) {
		printer.setTextQuadArea();
	} else if (smallOption.test(options)) {
		printer.setTextNormal();
	} else { // mediumOption (default)
		printer.setTextDoubleHeight();
	}

	// If data was specified.
	if (data) {
		printer.alignLeft();
		printer.println(data);
	}
};