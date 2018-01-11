let mongoose = require('mongoose');

let Messageschema = new mongoose.Schema({
	msg_by: {
		type: String,
		require: true
	},
	msg_content: {
		type: String,
		require: true
	},
	msg_date: {
		type: Number,
		require: true
	},
	msg_status: {
		type: String,
		default: 'notRead'
	}
})

Messageschema.statics = {
	
	// 获取留言
	fetchMsg(params, data) {
		return this.find({}).limit(params.itemShow * 1).skip((params.page -1) * params.itemShow).exec(data);
	},

	// 获取未读留言count
	fetchNotReadCount(data) {
		return this.find({'msg_status': 'notRead'}).count().exec(data);
	},

	// 改变留言状态为已读
	operateMsgStatus(msgArr, data) {
		let arr = Array.from(JSON.parse(msgArr));
		// console.log(Array.isArray(Array.from(JSON.parse(msgArr))))
		return this.update({'_id': {$in: arr}}, {$set: {'msg_status': 'hasRead'}}, {multi:true}).exec(data);
	},

	// 获取所有留言的长度
	fetchAllLength(data) {
		return this.find({}).count().exec(data);
	},

	// 删除留言
	delMsg(msgArr, data) {
		let arr = Array.from(JSON.parse(msgArr));
		return this.remove({"_id": {$in: arr}}).exec(data);
	}

}

module.exports = Messageschema;