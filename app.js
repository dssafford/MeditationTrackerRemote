
/**
 * Module dependencies.
 */

module.exports = function (entrys) {
	var express = require('express');
	var routes = require('./routes')(entrys);
	var path = require('path');	
	var app = express();

	// all environments
	app.set('port', process.env.PORT || 3030);
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

	app.get('/entrys/:id', routes.entrydetail);
//	app.put('/entry/:number/save', routes.saveentry);

// Save entry entry
//	app.put('/entry/save', routes.saveentry);

// this is for the form submit
	app.post('/entryinput', routes.saveentry);

// this is for the form submit
//	app.post('/entryUpdate', routes.updateentry);



// List out entry entries sorted by date
	app.get('/entrylist', routes.entriesByDate);


// Go to entry Input Form
	app.get('/entryinput', routes.entryinput);

// Go to entry edit form
	app.get('/entryedit/:id', routes.entryedit);

	app.post('/entryedit/:id', routes.updateentry);

	app.get('/entrydelete/:id', routes.entrydelete);

//	Home page
	app.get('/', routes.home);

	return app;
}


