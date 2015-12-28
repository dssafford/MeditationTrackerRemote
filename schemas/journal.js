var mongoose = require('mongoose');

module.exports = mongoose.model('Journal', {
	timestamp: Number,
	machine: String,
	directory: String,
	project: String,
	comments: String
});