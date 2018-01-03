var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var Announcementschema = new Schema({
	announcement_title: {
		type: String,
		require: true
	},
	announcement_content: {
		type: String,
		require: true
	},
	announcement_date: {
		type: Number,
		require: true
	},
	announcement_author: {
		type: String,
		default: 'admin'
	}
})

Announcementschema.statics = {
	getFourAnnouncements(data) {
		return this.find({},{'_id': 1, 'announcement_title': 1, 'announcement_date': 1}).sort({'announcement_date': -1}).limit(4).exec(data)
	}
}


module.exports = Announcementschema