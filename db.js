var mongoose = require('mongoose');

//mongoose.connect('mongodb://doug:doug@ds049651.mongolab.com:49651/flights');

var url = 'mongodb://localhost:27017/DougStudy';
mongoose.connect(url);
console.log("In db.js, mongoose connecting");

module.exports = mongoose.connection;