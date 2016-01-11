/*
 * GET home page.
 */

var entrySchema = require('../schemas/entry');

module.exports = function (entrys) {
	var entry = require('../entry');

	for(var number in entrys) {
		entrys[number] = entry(entrys[number]);
	}

	var functions = {};

	functions.entry = function(req, res){
		var number = req.param('number');

		if (typeof entrys[number] === 'undefined') {
			res.status(404).json({status: 'error in functions.entry'});
		} else {
			res.json(entrys[number].getInformation());
		}
	};

	// Just go to the home page
	functions.home = function(req, res) {
		console.log("Calling home page");
		res.render('home', {
			title: 'Doug entry Home;'
		});
	};

// Go to entry input form
	functions.entryinput = 	function (req, res) {
		console.log("in function entry input");
		res.render('entryinput', {
			title: 'All Doug entrys'});
	};

// Go to entry input form
	functions.entryedit = function (req, res) {
		console.log("in function entry edit");
		entrySchema.find({ _id: req.param('id') })
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



	functions.updateentry = function(req, res) {
		console.log("In updateentry");
		// below outputs full response to browser in json format
		//res.json(req.body);

		entrySchema.findOneAndUpdate({_id: req.param("id")} , {machine: req.param("machine"), directory: req.param("directory"),  project: req.param("projectname"), comments: req.param("comments")}, function(err, record) {
			if (err) throw err;

			console.log("id:" + req.param("id"));

			res.redirect("/entrylist");

			// record.timestamp = Date.now();
			// record.machine = req.body.machine;
			// record.directory = req.body.directory;
			// record.project = req.body.projectname;
			// record.comments = req.body.comments;

			// record.save(function(err) {
			// 	if (err) {
			// 		console.log(err);
			// 		res.status(500).json({status: 'failure'});
			// 	} else {
			// 		//res.json({status: 'success'});
			// 		res.redirect('/entrylist');
			// 	}
			// });
		});
	};


// Add the record data to database, from POST on form submit
	functions.saveentry = function(req, res) {
		// below outputs full response to browser in json format
		//res.json(req.body);
		console.log("IN SAVE entry - directory =" + req.body.directory);
			var record = new entrySchema(
				entrys[number].getInformation()
			);

			record.timestamp = Date.now();
			record.machine = req.body.machine;
			record.directory = req.body.directory;
			record.project = req.body.projectname;
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

			//res.json({status: 'done'});
};

	functions.list = function (req, res) {
		res.render('list', {
			title: 'All Doug entrys', 
			entrys: entrys});
	};

	functions.entriesByDate = function(req, res) {
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

	functions.entrydetail = function(req, res) {
		// get the user starlord55

		console.log("looking for id:" + req.param('id'));

		entrySchema.find({ _id: req.param('id') })
		.exec(function(err, entrys) {
			if (err) {
				res.status(500).json({status: 'failure'});
			} else {
				console.log("not failure getting entry detail");
				res.render('entrydetail', {
					title: 'entry Detail',
					entrys: entrys
				});
			}
		});		
	};

	functions.entrydelete = function(req, res){
		console.log("In entry Delete");
		 entrySchema.find( {_id: req.param("id")}, function(err,docs){
		  if (err) return console.log(err);
		  if (!docs || !Array.isArray(docs) || docs.length === 0) 
		    	return console.log('no docs found');
		  	
		  	docs.forEach( function (doc) {
		    		doc.remove();
		    		res.redirect("/entrylist");
		  	});

	            });
	 };

	return functions;
};