var mongoose = require('mongoose'),
	imgStorageschema = require('../schemas/imgStorage.js');

var ImgStorage = mongoose.model('ImgStorage', imgStorageschema, 'imgStorage');

module.exports = ImgStorage;