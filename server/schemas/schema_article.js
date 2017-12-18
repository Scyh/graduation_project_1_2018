var mongoose = require('mongoose');

var Comment = require('../models/comment.js');

var Articleschema = new mongoose.Schema({
	article_title: String,
	article_publish_date: String,
	article_content: String,
	article_pv: Number,
	_comment_id: {
		type: mongoose.Schema.ObjectId,
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
	test: function (data) {
		return this.find({_id : "ObjectId('5a20c9512fd18cd691073602')"}).pupulate('_comment_id').exec(data)
	}
}

module.exports = Articleschema