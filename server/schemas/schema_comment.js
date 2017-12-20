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
	article_dislike: {
		type: Number,
		default: 0
	},
	article_like_user: {
		type: Array,
		default: []
	},
	article_dislike_user: {
		type: Array,
		default: []
	},
	article_comment: {
		type: Array,
		default: []
	}
})

Commentschema.statics = {
	// 插入格式
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
/*
	// 删除
	db.getCollection('comment').update({"_id": ObjectId("5a20c9582fd18cd691073607")},
	        {$pull: { "article_comment": {
	                        "comment_content": "这里是一段as d 评论",
	            }}},
	        {multi: true}
	        ) 

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
	// 更新点赞或踩
/*
	db.getCollection('comment').update({"_article_id": "5a20c4502fd18cd691073538"},
{
    $addToSet: {"article_like_user": "mmmm"},
    $set:  {"article_like": 4}}
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
		return this.find({'_article_id': _article_id}).exec(data);
	},

	// 删除评论 
	deleteComment: function (params, data) {
		return this.update({"_article_id": params._article_id}, 
			{
				$pull: {"article_comment": {
					"comment_date": params.comment_date,
					"comment_content": params.comment_content
				}}
			}, 
			{
				multi: true
			}
		).exec(data);
	},

	//点赞或踩
	updateLikeOrNot: function (params, data) {
		// let str1 = 'article_' + params.type;
		// let str2 = 'article_' + params.type + '_user';
		if (params.type == 'like') {
			return this.update({'_article_id': params._article_id},
				{
					$addToSet: {'article_like_user': params.user},
					$set: {'article_like': params.count}
				}
			).exec(data);
		} else {
			return this.update({'_article_id': params._article_id},
				{
					$addToSet: {'article_dislike_user': params.user},
					$set: {'article_dislike': params.count}
				}
			).exec(data);
		}
	},
}

module.exports = Commentschema