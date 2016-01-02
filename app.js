
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

	app.get('/journals/:id', routes.journaldetail);
//	app.put('/journal/:number/save', routes.saveJournal);

// Save journal entry
//	app.put('/journal/save', routes.saveJournal);

// this is for the form submit
	app.post('/journalinput', routes.saveJournal);

// List out journal entries sorted by date
	app.get('/journallist', routes.entriesByDate);


// Go to Journal Input Form
	app.get('/journalinput', routes.journalinput);


//	Home page
	app.get('/', routes.home);

	return app;
}


