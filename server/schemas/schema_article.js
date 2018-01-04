var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var Articleschema = new mongoose.Schema({
	article_title: {
		type: String,
		require: true
	},
	article_publish_date: {
		type: Number,
		require: true
	},
	article_author: {
		type: String,
		require: true,
	},
	article_md_content: String,
	article_content: String,
	article_pv: {
		type: Number,
		default: 0
	},
	_comment_id: {
		type: Schema.Types.ObjectId,
		ref: 'Comment'
	},
	article_audit: {
		type: String,
		default: 'notAudit'
	}
})

Articleschema.statics = {
	fetchPart: function(params ,data) {
		if (params.category == 'all') {
			return this.find({'article_audit': 'audited'}).limit(5).skip((params.pageCount -1) * 5).exec(data);
		} else {
			return this.find({'category': params.category, 'article_audit': 'audited'}).limit(5).skip((params.pageCount -1) * 5).exec(data);
		}
		
	},
	fetchCount: function(category, data) {
		if (category == 'all') {
			return this.find({'article_audit': 'audited'}).count().exec(data);
		} else {
			return this.find({'category': category, 'article_audit': 'audited'}).count().exec(data);
		}
	},
	fetchByAuthor: function(params, data) {
		if (params.audit == 'all') {
			return this.find({'article_author': params.username}).exec(data)	
		} else {
			return this.find({'article_author': params.username, 'article_audit': params.audit}).exec(data)	
		}
		
	},
	deleteOne: function(_id, data) {
		return this.remove({"_id": _id}).exec(data)
	},
	search: function(key, data) {
		let arr = key.split(' ')
		let temp = []
		// let reg = new RegExp(key, 'i');
		arr.forEach((i, index) => {
			let reg = new RegExp(i, 'i');
			if (index == (arr.length -1)) {
				return this.find({'article_audit': 'audited', $or: [{'article_author': reg}, {'article_title': reg}, {'article_content': reg}, {'article_label': reg}, {'category': reg}]}).exec(data)
			}
			// exec 返回的是一个 promise 对象
			temp[index] = this.find({'article_audit': 'audited', $or: [{'article_author': reg}, {'article_title': reg}, {'article_content': reg}, {'article_label': reg}, {'category': reg}]}).then(data)
		})
		return temp
	},

	adminFetchSome(params, data) {
		switch(params.type) {
			case 'all':
				return this.find({}).limit(8).skip((params.page -1) * 8).exec(data);
				break;
			case 'audited':
			case 'notAudit':
				return this.find({'article_audit': params.type}).limit(8).skip((params.page -1) * 8).exec(data);
				break;
			default: 
				return this.find({}).limit(8).skip((params.page -1) * 8).exec(data);
		}
	},

	audit(id, data) {
		return this.update({"_id": id}, {$set: {'article_audit': 'audited'}}).exec(data);
	},

	fetchSortByPv(data) {
		return this.find({},{'article_title': 1, '_id': 1, 'article_author': 1}).sort({'article_pv': -1}).limit(4).exec(data)
	}
}

module.exports = Articleschema