var mongoose = require('mongoose');

// 建模
var Userschema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		require: true
	},
	password: {
		type: String,
		require: true
	},
	trueName: {
		type: String,
		default: ''
	},
	userProfile: {
		type: String,
		default: ''
	},
	sex: {
		type: String,
		default: ''
	}, // 性别
	job: {
		type: String,
		default: ''
	}, // 职业
	industry: {
		type: String,
		default: ''
	}, // 行业
	birthday: {
		type: String,
		default: ''
	}, // 生日，string类型方便存储和读取
	introduce: {
		type: String,
		default: ''
	}, // 简介
	permission: {
		type: Number,
		default: 1
	}, // 禁言 -> 1代表正常 0代表禁言
})

Userschema.statics = {
	checkUser: function(params, data) {
		// console.log()
		return this.find({
			'username': params.username,
			'password': params.password
		}, {'permission': 1}).exec(data);
	},

	uniqueUserName: function(params, data) {
		return this.find({
			'username': params.username
		}).count().exec(data);
	},

	findByUserName: function(params, data) {
		return this.find({
			'username': params.username
		}).exec(data);
	},

	adminFetchSome(index, data) {
		return this.find({}).limit(6).skip((index - 1) * 6).exec(data)
	},

	deleteUser(_id, data) {
		return this.remove({"_id": _id}).exec(data)
	},

	// 更改权限
	permission(params, data) {
		if ((params.permission*1) > 0) {
			return this.update({"_id": params.id}, {$set: {"permission": 0}})
		} else {
			return this.update({"_id": params.id}, {$set: {"permission": 1}})
		}	
	},

	searchUser(username, data) {
		let reg = new RegExp(username, 'i');
		return this.find({$or: [{"username": reg}]}).exec(data);
	}

}

module.exports = Userschema