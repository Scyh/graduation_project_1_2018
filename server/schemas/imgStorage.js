let mongoose = require('mongoose');

var imgStorageschema = new mongoose.Schema({
	lastModified: {
		type: Number,
		require: true
	},
	miniurl: {
		type:String,
		require: true
	},
	name: {
		type:String,
		require: true	
	},
	author: {
		type:String,
		require: true	
	}
})

imgStorageschema.statics = {
	
}

module.exports = imgStorageschema