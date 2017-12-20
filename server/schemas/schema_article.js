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
	fetchPart: function(pageCount ,data) {
		return this.find({}).limit(5).skip((pageCount.pageCount -1) * 5).exec(data);
	},
	fetchCount: function(data) {
		return this.find({}).count().exec(data);
	},
	fetchByAuthor: function (username, data) {
		return this.find({'article_author': username}, {'article_publish_date': 1, 'article_title': 1}).exec(data)
	},
	deleteOne: function (_id, data) {
		return this.remove({"_id": _id}).exec(data)
	},
}

module.exports = Articleschema