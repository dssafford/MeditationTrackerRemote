var mongoose = require('mongoose');

module.exports = mongoose.model('entry', {
	timestamp: Date,
	user: String,	
	minutes: Number,
	comments: String
});