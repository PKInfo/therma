# Therma
## A node.js app that acts as local print server for an Epson thermal receipt printer.

### Details
This app is accessible via the *local* network.

This app converts the request url into a print command.

I've successfully hosted this app on a Raspberry Pi.

This app uses the [node-thermal-printer](https://github.com/Klemen1337/node-thermal-printer) module.

### How this node.js app is organized:
* The **app.js** file contains the server object and acts as the main operator.
The **check.js** file is used to ensure that the printer is available. It contains and **error** and **timeout** *listeners*. (The NTP module's error functionality doesn't handle errors when connecting to the printer over the network.)
* The **format.js** file handles parsing and formatting the print data. I've included the following style options: *Bold*, *BlackBackground*, *Small*, *Medium* and *Large*. Options can be combined.
* The **print.js** file creates the printer object and issues the print command. If a **quantity** isn't included in the url, nothing prints (by design). I’ve chosen the paper cutting default to be *partialCut();*. This can be switched to *cut();*.

* The url is formatted as follows:
http://raspi.local:7777/?printerIP=&quantity=&data1=&options1=&data2=&options2=&data3=&options3=&data4=&options4=
