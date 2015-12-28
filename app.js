
/**
 * Module dependencies.
 */

module.exports = function (journals) {
	var express = require('express');
	var routes = require('./routes')(journals);
	var path = require('path');	
	var app = express();

	// all environments
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(function (req, res, next) {
		res.set('X-Powered-By', 'Doug Safford');
		next();
	});
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));

	// development only
	if ('development' == app.get('env')) {
	  app.use(express.errorHandler());
	}

	app.get('/journal/:number', routes.journal);
//	app.put('/journal/:number/save', routes.saveJournal);
	app.put('/journal/save', routes.saveJournal);


	app.post('/signup', routes.signup);

// app.post('/signup', function(req,res){
//   console.log(req.body);
// })



//	app.get('/list', routes.list);
	app.get('/journals', routes.entriesByDate);
	app.get('/doug', routes.shit);


	return app;
}


