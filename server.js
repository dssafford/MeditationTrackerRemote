var app = require('./app');
var debug = require('debug')('passport-local-express4:server');
var http = require('http');


//	db = require('./db'),
//	app = require('./app')(journals);

http.createServer(app).listen(app.get('port'), function(){
  console.log('In Server.js, Doug server listening on port ' + app.get('port'));
});