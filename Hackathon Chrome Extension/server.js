var express = require('express');
var app = express();
var fs = require("fs");

app.get('/validlinks', function (req, res) {
   fs.readFile( __dirname + "/" + "validsites.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})

var server = app.listen(8082, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Valid Sites Server listening at http://%s:%s", host, port)
})