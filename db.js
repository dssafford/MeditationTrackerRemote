var mongoose = require('mongoose');

//mongoose.connect('mongodb://doug:doug@ds049651.mongolab.com:49651/flights');

//var url = 'mongodb://localhost:27017/DougStudy';

 //mongodb://<dbuser>:<dbpassword>@ds037175.mongolab.com:37175/CloudFoundry_l1hnqf0n_mmhir01l

//uri: "mongodb://cloudfoundry-test_2p6otl8c_841b7q4b_tmtlqeaa:eb5d00ac-2a4f-4beb-80ad-9da11cff5a70@ds027908.mongolab.com:27908/cloudfoundry-test_2p6otl8c_841b7q4b"


var url = 'mongodb://doug:doug@ds037175.mongolab.com:37175/CloudFoundry_l1hnqf0n_mmhir01l';
mongoose.connect(url);
console.log("In db.js, mongoose connecting");

module.exports = mongoose.connection;