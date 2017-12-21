var mongoose = require('mongoose');

var Noticeschema = new mongoose.Schema({
	_notice_user_id: String,
	notice_user: {
		type: String,
		require: true,
		unique: true
	},
	notice: {
		type: Array,
		default: []
	}
})

Noticeschema.statics = {
	fecthNotice (user, data) {
		return this.find({'notice_user': user}).exec(data);
	},

	clearAllNotice (_id, data) {
		console.log(_id)
		return this.update({'_id': _id},
			{
				$set: {'notice': []}		
			}
		).exec(data);
	},

	addNotice (params, data) {
		console.log(params)
		return this.update({'notice_user': params.username}, {
			$addToSet: {
				"notice": params.notice
			}
		}).exec(data)
	}
}

module.exports = Noticeschema;