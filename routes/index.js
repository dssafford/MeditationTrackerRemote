/*
 * GET home page.
 */

var entrySchema = require('../schemas/entry');
//======= new ========
var mongoose = require('mongoose');


	// Just go to the home page
	exports.home = function(req, res) {
		console.log("Calling home page");
		res.render('home', {
			title: 'Doug entry Home;'
		});
	};


	exports.listentriesByDate = function(req, res) {
		entrySchema.find()
		.setOptions({sort: 'timestamp'})
		.exec(function(err, entrys) {
			if (err) {
				res.status(500).json({status: 'failure'});
			} else {
				res.render('entrys', {
					title: 'entrys',
					entrys: entrys
				});
			}
		});
	};

	// Go to entry input form
	exports.entryinput = 	function (req, res) {
		console.log("in function entry input");
		res.render('entryinput', {
			title: 'All Doug entrys'});
	};

	// Go to entry input form
	exports.entryedit = function (req, res) {
		console.log("in function entry edit");
		entrySchema.find({ _id: req.params.id})
		.exec(function(err, entrys) {
			if (err) {
				res.status(500).json({status: 'failure'});
			} else {
				console.log("not failure getting entry edit");
				res.render('entryedit', {
					title: 'Edit entry',
					entrys: entrys
				});
			}
		});		
	};	

	exports.updateentry = function(req, res) {
		//console.log("In updateentry");
		entrySchema.findOneAndUpdate({_id: req.body.id} , {user: req.body.user, minutes: req.body.minutes,  comments: req.body.comments}, function(err, record) {
			if (err) throw err;

			console.log("id:" + req.body.id);

			res.redirect("/entrylist");
		});
	};

	// Add the record data to database, from POST on form submit
	exports.saveentry = function(req, res) {
		// below outputs full response to browser in json format
		//res.json(req.body);
		var record = new entrySchema();

		record.timestamp = Date.now();
		record.user = req.body.user;
		record.minutes = req.body.minutes;
		record.comments = req.body.comments;

		record.save(function(err) {
			if (err) {
				console.log(err);
				res.status(500).json({status: 'failure'});
			} else {
				//res.json({status: 'success'});
				res.redirect('/entrylist');
			}
		});
	};
	exports.entrydelete = function(req, res){
		console.log("In entry Delete");
		 entrySchema.find( {_id: req.params.id}, function(err,docs){
		  if (err) return console.log(err);
		  if (!docs || !Array.isArray(docs) || docs.length === 0) 
		    	return console.log('no docs found');
		  	
		  	docs.forEach( function (doc) {
		    		doc.remove();
		    		res.redirect("/entrylist");
		  	});

		         });
	};
