var mongoose = require('mongoose');
var Articleschema = require('../schemas/schema_article.js');

var Article = mongoose.model('Article',Articleschema,'article');

module.exports = Article;