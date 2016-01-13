	var express = require('express');
	var app = express();
	//var routes = require('./routes')(entrys);
	var routes = require("./routes");

	var path = require('path');	

	var favicon = require('serve-favicon');

	// added below to update 
	var bodyParser = require('body-parser');
	var morgan = require('morgan');
	var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
	var config = require('./config'); // get our config file
//	var User = require('./schemas/user'); // get our mongoose model

//	app.set("superSecret", config.secret);


	var http = require('http'),
		entrys = require('./data'),
		db = require('./db')

	// all environments
	app.set('port', process.env.PORT || 3030);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');


//	app.use(express.favicon());
// using morgan instead of logger - app.use(express.logger('dev'));

//============Upgrades to newer express =================
	// changed - app.use(express.bodyParser());
	// use body parser so we can get info from POST and/or URL parameters
	app.use(bodyParser.urlencoded({
	    extended: false
	}));
	app.use(bodyParser.json());

	// use morgan to log requests to the console
	app.use(morgan('dev'));

	// changed - app.use(express.methodOverride());

//=== End of upgrades to newer express ==================



	// Middleware playing with headers
	app.use(function (req, res, next) {
		res.set('X-Powered-By', 'Doug Safford');
		next();
	});

	app.use(express.static(path.join(__dirname, 'public')));

	var dougRoutes = express.Router();

	app.get('/doug', function(req, res) {

		res.send('Hello from Doug, from /Doug route');

	});
/*
	// SetUp first user simple route
	app.get('/setup', function(req, res) {

	    // create a sample user
	    var dragon = new User({
	        name: 'Dragon',
	        password: 'dale',
	        admin: true
	    });

	    // save the sample user
	    dragon.save(function(err) {
	        if (err) throw err;

	        console.log('User doug saved successfully');
	        res.json({
	            success: true
	        });
	    });

	    var nighthawk = new User({
	    	name: 'Nighthawk',
	    	password: 'brennan',
	    	admin: true
	    });
	    nighthawk.save(function(err) {
	    	if (err) throw err;
	    	console.log("User nighthawk saved successfully");
	    	reson.json({
	    		success: true
	    	});
	    });

	});
*/


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


// this is for the form submit
	app.post('/entryinput', routes.saveentry);

// this is for the form submit
	app.post('/entryUpdate', routes.updateentry);

//	Home page
	app.get('/', routes.home);


// Go to entry Input Form
	app.get('/entryinput', routes.entryinput);

// Go to entry edit form
	app.get('/entryedit/:id', routes.entryedit);

	// Update record

	app.post('/entryedit/:id', routes.updateentry);

	// Delete record

	app.get('/entrydelete/:id', routes.entrydelete);


// List out entry entries sorted by date
 	app.get('/entrylist', routes.listentriesByDate);


http.createServer(app).listen(app.get('port'), function(){
  console.log('In Server.js, Doug server listening on port ' + app.get('port'));
});