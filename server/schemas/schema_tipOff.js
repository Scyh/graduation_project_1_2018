var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var tipOffschema = new Schema({
	tip_off_content: {
		type: String,
		require: true
	},
	tip_off_by: {
		type: String,
		require: true	
	},
	tip_off_to: {
		type: String,
		require: true
	},
	tip_off_date: {
		type: Number,
		require: true
	},
	tip_off_article_title: {
		type: String,
		require: true
	},
	tip_off_article_id: {
		type: String,
		require: true	
	}
})

tipOffschema.statics = {
	adminFetchSome(page, data) {
		return this.find({}).limit(6).skip((page-1) * 6).exec(data)
	}
}


module.exports = tipOffschema