/*
 * GET home page.
 */

var journalSchema = require('../schemas/journal');

module.exports = function (journals) {
	var journal = require('../journal');

	for(var number in journals) {
		journals[number] = journal(journals[number]);
	}

	var functions = {};

	functions.journal = function(req, res){
		var number = req.param('number');

		if (typeof journals[number] === 'undefined') {
			res.status(404).json({status: 'error in functions.journal'});
		} else {
			res.json(journals[number].getInformation());
		}
	};

	// Just go to the home page
	functions.home = function(req, res) {
		console.log("Calling home page");
		res.render('home', {
			title: 'Doug Journal Home;'
		});
	};

// Go to Journal input form
	functions.journalinput = 	function (req, res) {
		console.log("in function journal input");
		res.render('journalinput', {
			title: 'All Doug journals'});
	};

// Add the record data to database, from POST on form submit
	functions.saveJournal = function(req, res) {
		// below outputs full response to browser in json format
		//res.json(req.body);
		console.log("directory =" + req.body.comments);
			var record = new journalSchema(
				journals[number].getInformation()
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
					res.redirect('/journallist');
				}
			});

			//res.json({status: 'done'});
};

	functions.list = function (req, res) {
		res.render('list', {
			title: 'All Doug journals', 
			journals: journals});
	};

	functions.entriesByDate = function(req, res) {
		journalSchema.find()
		.setOptions({sort: 'timestamp'})
		.exec(function(err, journals) {
			if (err) {
				res.status(500).json({status: 'failure'});
			} else {
				res.render('journals', {
					title: 'Journals',
					journals: journals
				});
			}
		});
	};

	return functions;
};