var mongoose = require('mongoose');
	
module.exports = function() {
	var DB_CONN_STR = 'mongodb://localhost:27017/database';
	mongoose.connect('mongodb://localhost/database');

	var db = mongoose.connection;
	db.on('open', function(){
	    console.log('MongoDB Connection Successed');
	});
	// 连接失败
	db.on('error', function(){
	    console.log('MongoDB Connection Error');
	});

	return db;
}