var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var Articleschema = new mongoose.Schema({
	article_title: String,
	article_publish_date: String,
	article_content: String,
	article_pv: Number,
	_comment_id: {
		type: Schema.Types.ObjectId,
		ref: 'Comment'
	}
})

Articleschema.statics = {
	fetchPart: function(params ,data) {
		if (params.category == 'all') {
			return this.find({}).limit(5).skip((params.pageCount -1) * 5).exec(data);	
		} else {
			return this.find({'category': params.category}).skip((params.pageCount -1) * 5).exec(data);
		}
		
	},
	fetchCount: function(category, data) {
		if (category == 'all') {
			return this.find({}).count().exec(data);
		} else {
			return this.find({'category': category}).count().exec(data);
		}
	},
	fetchByAuthor: function (username, data) {
		return this.find({'article_author': username}).exec(data)
	},
	deleteOne: function (_id, data) {
		return this.remove({"_id": _id}).exec(data)
	},
}

module.exports = Articleschema