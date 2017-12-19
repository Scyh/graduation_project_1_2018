var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var Commentschema = new mongoose.Schema({
	_article_id: {
		 type: String,
		 require: true
	},
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
		return this.update({'_article_id': params._article_id}, {
			$addToSet: {
				'article_comment': params.reply
			}
		}).exec(data)
	},

	// 查找评论
	fetchComment: function (_article_id, data) {
		console.log(_article_id)
		return this.find({'_article_id': _article_id}).exec(data);
	}
}

module.exports = Commentschema