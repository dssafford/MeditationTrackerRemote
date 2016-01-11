var mongoose = require('mongoose');

module.exports = mongoose.model('entry', {
	timestamp: Number,
	user: String,	
	minutes: Number,
	comments: String
});