var http = require('http');
var fs = require('fs');

var mime = require('mime');
var extract = require('./extract');
var handle404Error = require('./handle404Error');


var server = http.createServer(function(req, res){
  console.log('Responding to a request.');

  var filePath = extract(req.url);
  fs.readFile(filePath, function(err, data){
    var mimeType = mime.getType(filePath);
    res.setHeader('Content-Type', mimeType);

    if(err){
      handle404Error(err, res);
      return;
    } else{
      res.end(data);
    }
  });
});

server.listen(3000);
