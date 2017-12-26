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
	search: function (key, data) {
		let arr = key.split(' ')
		let temp = []
		// let reg = new RegExp(key, 'i');
		arr.forEach((i, index) => {
			let reg = new RegExp(i, 'i');
			if (index == (arr.length -1)) {
				return this.find({$or: [{'article_author': reg}, {'article_title': reg}, {'article_content': reg}, {'article_label': reg}, {'category': reg}]}).exec(data)
			}
			// exec 返回的是一个 promise 对象
			temp[index] = this.find({$or: [{'article_author': reg}, {'article_title': reg}, {'article_content': reg}, {'article_label': reg}, {'category': reg}]}).then(data)
		})
		return temp
	}
}

module.exports = Articleschema