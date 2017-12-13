var mongoose = require('mongoose');

var Articleschema = new mongoose.Schema({
	article_title: String,
	article_publish_date: String,
	article_content: String,
	article_pv: Number
})

Articleschema.statics = {
	fetchPart: function(pageCount ,data) {
		return this.find({}).limit(5).skip((pageCount.pageCount -1) * 5).exec(data);
	},
	fetchCount: function(data) {
		return this.find({}).count().exec(data);
	}
}

module.exports = Articleschema