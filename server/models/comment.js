var mongoose = require('mongoose');
var Commentschema = require('../schemas/schema_comment.js');

var Comment = mongoose.model('Commment', Commentschema, 'comment')

module.exports = Comment;