var mongoose = require('mongoose'),
	Articleschema = require('../schemas/schema_article.js');

var Article = mongoose.model('Article',Articleschema,'article');

module.exports = Article;