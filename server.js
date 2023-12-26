//import home from '../index.html'
'use strict';
var http = require('http');
var fs = require('fs');

var port = process.env.PORT || 1337;
// todo: make this fucker work so i can load my js
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    //res.end('../index.html');
    fs.createReadStream('./index.html').pipe(res);
}).listen(port);
