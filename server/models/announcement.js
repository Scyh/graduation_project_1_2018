var mongoose = require('mongoose'),
	Announcementschema = require('../schemas/schema_announcement.js');

var Announcement = mongoose.model('Announcement',Announcementschema,'announcement');

module.exports = Announcement;