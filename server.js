var http = require('http'),
	entrys = require('./data'),
	db = require('./db'),
	app = require('./app')(entrys);

http.createServer(app).listen(app.get('port'), function(){
  console.log('In Server.js, Doug server listening on port ' + app.get('port'));
});