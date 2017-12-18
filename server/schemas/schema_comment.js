var mongoose = require('mongoose');
var Article = require('./schema_article.js');

var Commentschema = new mongoose.Schema({
	article_like: {
		type: Number,
		default: 0
	},
	article_comment: {
		type: Array,
		default: []
	}
})

Commentschema.statics = {

	//  插入格式
/*
	db.getCollection('comment').update({"_id" : ObjectId("5a20c9582fd18cd691073607")}, {"$addToSet": {
    "article_comment":{
                        "comment_author" : "admin",
                        "comment_date" : "2017/12/12/16:41",
                        "comment_content" : "这里是一段评论"
            }
        }
    })
*/

 	// 排序
/*
	 	db.getCollection('comment').update(
	    {"_id": ObjectId("5a20c9582fd18cd691073607")},
	    {
	     $push: {"article_comment":{ $each: [], $sort:{"comment_date": 1} }} 
	    }
	)
*/


	// 添加评论
	addComment: function(params, data) {
		console.log(params)
		// return 
	},
}

module.exports = Commentschema