

/**
 * Module dependencies.
 */

//module.exports = function (entrys) {
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
	var User = require('./schemas/user'); // get our mongoose model

	app.set("superSecret", config.secret);


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




// API ROUTES -------------------
// we'll get to these in a second
// API ROUTES -------------------
// get an instance of the router for api routes
var apiRoutes = express.Router();
console.log("before apiRoutes.post");
// route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRoutes.post('/authenticate', function(req, res) {
    console.log("after routes post");
    // find the user
    User.findOne({
        name: req.body.name
    }, function(err, user) {
        console.log("in find one");
        if (err) throw err;

        if (!user) {
            res.json({
                success: false,
                message: 'Authentication failed. User not found.'
            });
        } else if (user) {

            // check if password matches
            if (user.password != req.body.password) {
                res.json({
                    success: false,
                    message: 'Authentication failed. Wrong password.'
                });
            } else {

                // if user is found and password is right
                // create a token
                var token = jwt.sign(user, app.get('superSecret'), {
                    expiresIn: 10560 // expires in 24 hours
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }

        }

    });
});
// get an instance of the router for api routes
//var apiRoutes = express.Router();

// TODO: route to authenticate a user (POST http://localhost:8080/api/authenticate)

// TODO: route middleware to verify a token
// route middleware to verify a token


	apiRoutes.use(function(req, res, next) {

	  // check header or url parameters or post parameters for token
	  var token = req.body.token || req.query.token || req.headers['x-access-token'];

	  // decode token
	  if (token) {

	    // verifies secret and checks exp
	    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
	      if (err) {
	        return res.json({ success: false, message: 'Failed to authenticate token.' });    
	      } else {
	        // if everything is good, save to request for use in other routes
	        req.decoded = decoded;    
	        next();
	      }
	    });

	  } else {

	    // if there is no token
	    // return an error
	    return res.status(403).send({ 
	        success: false, 
	        message: 'No token provided.' 
	    });
	    
	  }
	});
// route to show a random message (GET http://localhost:8080/api/)
apiRoutes.get('/', function(req, res) {
    res.json({
        message: 'Welcome to the coolest API on earth!'
    });
});

// route to return all users (GET http://localhost:8080/api/users)
apiRoutes.get('/users', function(req, res) {
    User.find({}, function(err, users) {
        res.json(users);
    });
});

// Setup the /api route
app.use("/api", apiRoutes);

// List out entry entries sorted by date
 	app.get('/entrylist', routes.listentriesByDate);


http.createServer(app).listen(app.get('port'), function(){
  console.log('In Server.js, Doug server listening on port ' + app.get('port'));
});