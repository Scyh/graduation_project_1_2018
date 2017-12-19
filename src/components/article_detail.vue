<template>
		<div class="article">
			<div class="container">
				<div class="row">
					<div :class="canEdit?'col-md-8':'col-md-12'">
						<article>
							<div class="article-header">
								<h2>{{ article.article_title }}</h2>
								<div class="article-meta">
									<span>作者：{{ article.article_author }}</span>
									<span>&nbsp;&nbsp;&nbsp;&nbsp;发布于：{{ article.article_publish_date }}&nbsp;&nbsp;</span>
									<span class="article_pv">{{ article.article_pv }}</span>
									<span class="edit" v-show="canEdit">
										<a href="javascript:void(0)">编辑</a>
										<a href="javascript:void(0)">删除</a>
									</span>
								</div>
							</div>
							<div class="article-body" v-html="article.article_content"></div>
							<div class="article-footer">
								<span>{{ article.article_label }}</span>
								
							</div>
						</article>
						<div class="article-comment">
							<div v-if="!hasLogIn">
								<p>目前您尚未登录，请<b @click="logIn">登录</b>或<b @click="reg">注册</b>后进行评论</p>
							</div>
							<div v-else>
								<div class="reply-wrap" tabindex="0">
									<form class="reply-form">
										<textarea class="reply form-control" placeholder="发表你的评论" @focus="animate" @keyup="computedCharacter"></textarea>
									</form>
									<div class="reply-footer">
										<button @click="reply" class="btn btn-reply">发表评论</button>
										<span></span>
									</div>
								</div>
								<div v-if="commentsLength">
									<ul class="comment-list">
										<template v-for="(item, index) in article_comment">
											<li>
												<span class="comment_author">{{ item.comment_author }}</span>
												<span>{{ index + 1 }}楼 • {{ item.comment_date|getDate }}</span>
												<p>{{ item.comment_content }}</p>
												<span @click="replyOne">回复</span>
												<span @click="deleteComment" v-show="canEdit" class="edit"><a href="javascript:void(0)">删除</a></span>
											</li>
										</template>
									</ul>
								</div>
	
								<div v-else>
									<p>尚未有评论！赶快来添加你的评论吧~</p>	
								</div>

							</div>
						</div>
					</div>

					<div class="col-md-4" v-show="canEdit">
						这里是副边栏
					</div>
				</div>
			</div>
		</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	export default {
		data: function() {
			return {
				article: '',
				article_like: 0,
				article_comment:[],
			}
		},
		computed: {
			...mapGetters([
				'hasLogIn'
			]),
			commentsLength:function() {
				return this.article_comment.length>0?true:false;
			},
			// 的长度
			commentCharacterLength: function () {
				return $(".reply").val().toString().length;
			},
			canEdit: function () {
				let reg = /^\/[a-zA-Z0-9\_]{3,13}\/articles\/[a-zA-Z0-9]/;
				return reg.test(this.$route.path)
			}
		},
		mounted: function() {
			this.initArticle();
			this.initComment();
		},
		methods: {

			// 初始化文章
			initArticle: function() {
				let that = this;
				$.get('http://localhost:3000/api/getArticleDetail', {
					_id: this.$route.params.id
				}, function(data) {
					that.article = data.article
				});
			},

			// 初始化评论
			initComment: function() {
				let that = this;
				$.get('http://localhost:3000/api/getComment', {
					_id: this.$route.params.id
				}, function(data) {

					// 没有评论
					if (data.status == 'noComment') {
					} else {
						// console.log(data.article_comment);
						that.article_comment = [];
						data[0].article_comment.forEach((item,index) => {
							that.article_comment.push(item);
						})
					}
					// if (data.status == 'hasComment') {
					// 	that.article_like = data.article_like;
						// for (let i in data.comment) {
						// 	that.article_comment[i] = data.comment[i];
						// 	for (let obj in data.comment[i]) {
						// 			that.article_comment[i][obj] = data.comment[i][obj]
						// 	}
						// }
					// }
				});
			},

			// 发表评论
			reply: function (event) {
				let that = this;
				let reply = $(".reply").val();

				// 捕获 replyTo
				let reg = /\[reply\]([\s\S]*?)\[\/reply\]/;
				if (reply.match(reg) == null || reply.match(reg) == 'null') {
					// 不是回复评论，直接添加。需要给 文章的作者 添加 新消息通知
					if (reply == '') {
						$(".reply-footer span").html("请输入字符");
					} else {
						$(".reply-footer span").html("");
							$.post('http://localhost:3000/api/reply', {
								_article_id: that.article._id,
								type: 'comment',
								comment_content: reply,
								comment_author: sessionStorage.username,
								comment_date: Date.parse(new Date())
							}, function(data, textStatus, xhr) {
								if (data.status == 'success') {
									alert("评论成功")
									$(".reply").val("");
									that.initComment()
								}
						});
					}
				} else {
					let replyTo = reply.match(reg)[1];
					// 添加评论的同时，需要 给 replyTo 添加 新消息通知
				}

			},

			// 回复评论
			replyOne: function (event) {
				let replyTo = $(event.currentTarget).parent().find(".comment_author").html();
				$(".reply").focus().val("[reply]" + replyTo + '[/reply]' +'\r\n')
			},

			animate: function (event) {
				$(event.target).animate({
					height: 85
				},300);

				$(".btn-reply").animate({
					opacity: 1,
					height: 30
					},400);
			},

			computedCharacter: function (event) {
				let length = $(event.target).val().toString().length;
				$(event.target).parent().next().find('span').html("还剩" + (1000-length) + "个字符可以输入")
			},

			logIn: function () {
				$(".btn-login").trigger('click');
			},

			reg: function () {
				$(".btn-reg").trigger('click');
			},

			deleteComment: function () {
				
			},

		},
	}
</script>
<style scoped>
	.article {
		padding: 15px;
		background: url(../assets/bj.png) repeat;
	}
	article,
	.article-comment {
		padding: 30px;
		background-color: #FFF;
	}
	.article-meta {
		color: #838383;
		font-size: 14px
	}
	.article-header,
	.article-body,
	.article-footer {
		padding: 15px 0;
		border-bottom: 1px solid #E5E5E5;
	}
	.article_pv::before {
		content: url('../assets/article_pv.svg');
		display: inline-block;
		position: relative;
		left: 0px;
		top: 11px;
		margin-right: 3px;
	}
	.article-body {
		min-height: 400px;
	}
	.article-footer span{
		display: inline-block;
		padding: 2px 5px;
		font-size: 12px;
		border-radius: 2px;
		background-color: #E5E5E5;
	}
	.article-comment {
		margin-top: 30px;
	}
	.article-comment b {
		color: #41B886;
		cursor: pointer;
	}
	.reply-form {
		margin-bottom: 15px;
	}
	.reply-wrap {
		outline: 0;
		margin-bottom: 15px;
	}
	.reply {
		height: 40px;
		resize: none;
		transition: all 0.4s linear;
	}
	.reply-footer {
		overflow: hidden;
	}
	.reply-footer span {
		float: right;
		display: inline-block;
		margin-right: 10px;
    	margin-top: 10px;
    	color: #41B886;
	}
	.btn-reply {
		float: right;
		margin-top: 5px; 
		height: 0;
		opacity: 0;
	}
	.comment-list {
		padding-left: 0;
	}
	.comment-list li{
		padding-bottom: 10px;
		list-style: none;
		border-bottom: 1px solid #E1E1E1
	}
	.comment-list li p,
	.comment-list li span:nth-child(4) {
		padding: 10px 0;
		padding-left: 32px;
		margin-bottom: 0;
	}
	.comment-list li span:nth-child(4),
	.comment-list li span:nth-child(2) {
		color: #08C;
	}
	.comment-list li span:nth-child(4) {
		cursor: pointer;
	}
	.comment-list li span:nth-child(4):hover {
		color: #009A61;
	}
	.edit {
		float: right;
	}
</style>