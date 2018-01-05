<template>
		<div class="article">
			<div class="container">
				<div class="row">
					<div class="col-md-8">
						<article>
							<div class="article-header">
								<h2>{{ article.article_title }}</h2>
								<div class="article-meta">
									<span>作者：{{ article.article_author }}</span>
									<span>&nbsp;&nbsp;&nbsp;&nbsp;发布于：{{ article.article_publish_date | getDate}}&nbsp;&nbsp;</span>
									<span class="article_pv">{{ article.article_pv }}</span>
									<span class="edit" v-show="canEdit">
										<a href="javascript:void(0)"  @click="reEdit"><span class="glyphicon glyphicon-edit"></span>编辑</a>
										<a href="javascript:void(0)" @click="deleteArticle"><span class="glyphicon glyphicon-trash"></span>删除</a>
									</span>
								</div>
							</div>
							<div class="article-body" v-html="article.article_content"></div>
							<div class="article-footer">
								<div class="row">
									<div class="col-md-12"><span>副标签：{{ article.article_label | switchSubLabel }}</span></div>
									<div class="col-md-2 col-md-offset-4 like"><span :class="{forbidden: hasClick, disabled: hasLike}" @click="likeOrNot('like', $event)">赞 | <i>{{ article_like }}</i></span></div>
									<div class="col-md-2 dislike"><span :class="{forbidden: hasClick, disabled:hasDislike }" @click="likeOrNot('dislike', $event)">踩 | <i>{{ article_dislike }}</i></span></div>
								</div>
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
												<span class="comment_date" :time="item.comment_date">{{ item.comment_date|getDate }}</span>
												<span>{{ index + 1 }}楼</span>
												<p v-html="item.comment_content"></p>
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

					<div class="col-md-4">
						<cus-aside :name="article_author"></cus-aside>
					</div>
				</div>
			</div>
		</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import cusAside from './publicHomeAside.vue'
	import bus from '../bus.js'

	export default {
		data: function() {
			return {
				article: {},
				article_author: '',
				article_comment:[],
				article_like: 0,
				article_dislike: 0,
				hasLike: false,
				hasDislike: false,
			}
		},
		computed: {
			...mapGetters([
				'hasLogIn'
			]),
			commentsLength() {
				return this.article_comment.length>0?true:false;
			},
			// 的长度
			commentCharacterLength: function () {
				return $(".reply").val().toString().length;
			},
			canEdit: function () {
				// 判断路由的同时，还要判断 当前登录user 是否与 所看文章的author 是同一人
				let reg = /^\/[a-zA-Z0-9\_]{3,13}\/articles\/[a-zA-Z0-9]/;
				if (reg.test(this.$route.path)) {
					let reg2 = /^\/([a-zA-Z0-9\_]{3,13})\/articles/;
					let temp = reg2.exec(this.$route.path)[1];
					return reg.test(this.$route.path) && (temp == sessionStorage.username)
				} else {
					return false
				}
			},
			hasClick: function () {
				return this.hasLike || this.hasDislike
			},
			_article_id: function () {
				return this.$route.params.id
			},
		},
		beforeMount: function () {
			window.scroll(0,0)
		},
		mounted: function () {
			this.initArticle();
			this.initComment();
		},
		updated(event) {
			$(".article-body").html($(".article-body").text())
		},
		beforeDestroy() {
			// console.log(this.$route)
			if (this.$route.path == '/edit/mdEditor') {
				console.log('重新编辑');
				console.log(this.article._id)
				bus.$emit('reEdit', this.article._id)
			}
		},
		watch: {
			$route() {
				this.initArticle()
				// this.initComment();
			}
		},
		methods: {

			// 初始化文章
			initArticle: function() {
				let that = this;
				$.get('http://localhost:3000/api/getArticleDetail', {
					_id: that._article_id
				}).then(function (data) {
					// for (let i in data) {
					// 	that.article[i] = data[i]
					// }
					that.article_author = data.article_author
					that.article = data

					console.log(data)
				});
			},

			// 初始化评论
			initComment: function() {
				let that = this;
				$.get('http://localhost:3000/api/getComment', {
					_id: that._article_id
				}, function(data) {

					// 没有评论
					if (data.status == 'noComment') {
						that.hasLike = false;
					} else {
						that.article_comment = [];
						data[0].article_comment.forEach((item, index) => {
							that.article_comment.push(item);
						})

						that.article_like = data[0].article_like;
						that.article_dislike = data[0].article_dislike;

						that.hasLike = !!($.inArray(sessionStorage.username, data[0].article_like_user) > -1);
						that.hasDislike = !!($.inArray(sessionStorage.username, data[0].article_dislike_user) > -1);
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

			// 点赞 
			likeOrNot: function (type, event) {
				let that = this
				// console.log(($(event.currentTarget).parent().find('i').html() * 1) + 1)

				if (sessionStorage.username == undefined || sessionStorage.username == '' || sessionStorage.username == 'undefined')  {
        			console.log("未登录");
        			alert("请登录")
      			} else {
					if ($(event.currentTarget).hasClass('forbidden')) {
						// 已经点击过
						return
					} else {
						if (type == 'like') {
							this.updateLikeOrNot('like');
							that.addNotice(that.article.article_author,'like');
						} else if (type == 'dislike') {
							
							this.updateLikeOrNot('dislike')
							that.addNotice(that.article.article_author,'dislike')
						}

					}
      			}
			},	// likeOrNot end

			updateLikeOrNot: function (type) {
				let that = this;
				$.post('http://localhost:3000/api/likeOrNot', {
							_article_id: that._article_id,
							commentsLength: that.article_comment.length,
							type: type,
							count: ($(event.currentTarget).parent().find('i').html() * 1) + 1,
							user: sessionStorage.username
						}, function(data, textStatus, xhr) {
							if (data.status == 'success') {
								// 初始化
								console.log("初始化")
								that.initComment();	
							} else {
								alert("点击失败")
							}
							
				});
			},	// updateLikeOrNot end

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
						that.replyFn(reply);
						that.addNotice(that.article.article_author,'newComment')
					}
				} else {
					let replyTo = reply.match(reg)[1];
					// 添加评论的同时，需要 给 replyTo 添加 新消息通知
					let tempStr = '@' + replyTo + '&nbsp;&nbsp;' + reply.slice(reply.indexOf('[/reply]') + 8).trim();
					// console.log(tempStr)
					that.replyFn(tempStr);
					that.addNotice(replyTo,'newCommentReply')

				}
			},	// reply end

			replyFn: function (content) {
				let that = this; 
				$.post('http://localhost:3000/api/reply', {
						_article_id: that.article._id,
						type: 'comment',
						comment_content: content,
						comment_author: sessionStorage.username,
						comment_date: Date.parse(new Date())
					}, function(data, textStatus, xhr) {
						if (data.status == 'success') {
							alert("评论成功")
							$(".reply").val("");
							that.initComment()
						}
				});
			},	// replyFn end

			// 回复评论
			replyOne: function (event) {
				let replyTo = $(event.currentTarget).parent().find(".comment_author").html();
				$(".reply").focus().val("[reply]" + replyTo + '[/reply]' +'\r\n')
			},	// replyOne

			animate: function (event) {
				$(event.target).animate({
					height: 85
				},300);

				$(".btn-reply").animate({
					opacity: 1,
					height: 30
					},400);
			},	// animate

			computedCharacter: function (event) {
				let length = $(event.target).val().toString().length;
				$(event.target).parent().next().find('span').html("还剩" + (1000-length) + "个字符可以输入")
			},	// computedCharacter end

			logIn: function () {
				$(".btn-login").trigger('click');
			},	// logIn end

			reg: function () {
				$(".btn-reg").trigger('click');
			},	// reg end

			// 删除评论
			deleteComment: function (event) {
				let that = this;
				// console.log($(event.currentTarget).prevAll(".comment_date").attr('time'))
				console.log($(event.currentTarget).prevAll('p').html())
				$.post('http://localhost:3000/api/deleteComment', {
					_article_id: that.article._id,
					comment_date: $(event.currentTarget).prevAll(".comment_date").attr('time'),
					comment_content: $(event.currentTarget).prevAll('p').html(),
				}, function(data, textStatus, xhr) {
					if (data.status == 'success') {

						// 加载 动画
						setTimeout(() => {
							that.initComment();
						}, 600)
					} else if (data.status == 'fail') {
						alert("删除失败");
					} else {
						console.log("出现未知错误");
					}
				});
			},	// deleteComment end

			// 删除文章
			deleteArticle: function (event) {
				let that = this;
				$.post('http://localhost:3000/api/deleteArticle', {
					_id: that.article._id
				}, function(data, textStatus, xhr) {
					if (data.status == 'success') {
						
						// 加载 动画
						setTimeout(() => {
							that.$router.replace('/' + that.article.article_author + '/home');	
						},600)

					} else if (data.status == 'fail') {
						alert("删除失败")
					}
					
				});
			},	// deleteArticle end

			// 通知
			addNotice: function (toUser,type) {
				let that = this;
				$.post('http://localhost:3000/api/addNotice', {
					notice_user: toUser,
					notice_state: "notRead",
					notice_date: Date.parse(new Date()),
					notice_ByUser: sessionStorage.username,
					notice_type: type,
					notice_title: that.article.article_title,
					notice_title_id: that.article._id
				}, function(data, textStatus, xhr) {
					if (data.status == 'success') {
						console.log("添加通知成功")
					}					
				});
			},	// addNotice end

			reload() {
				location.reload()
			},	// reload end

			reEdit() {
				// console.log(this.article._id)
				this.$router.replace({path: '/edit/mdEditor', query: {id: this.article._id}})

			},
		},

		components:{
			cusAside
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
	.article-header h2{
		text-align: center;
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
	.article-footer {
		border: none;
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
		word-wrap: break-word;
	}
	.article-footer .row div:first-child >span{
		display: inline-block;
		padding: 4px 10px;
		font-size: 14px;
		color: #999;
	}
	.article-footer .col-md-2:nth-child(2) span,
	.article-footer .col-md-2:nth-child(3) span {
		display: inline-block;
		padding: 5px 12px;
		color: #FFF;
		background-color: #009A61;
		border-radius: 5px;
		font-size: 22px;
		cursor: pointer;
	}
	.article-footer .col-md-2:nth-child(3) span {
		background-color: #444;
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
	.comment-list li span:nth-child(5) {
		padding: 10px 0;
		padding-left: 32px;
		margin-bottom: 0;
	}
	.comment-list li span:nth-child(5),
	.comment-list li span:nth-child(2) {
		color: #08C;
	}
	.comment-list li span:nth-child(5) {
		cursor: pointer;
	}
	.comment-list li span:nth-child(5):hover {
		color: #009A61;
	}
	.comment-list li span:nth-child(3) {
		float: right;
	}
	.edit {
		float: right;
		margin-top: 15px;
	}
	.edit a:first-child {
		margin-right: 10px;
	}
	.edit a span {
		margin-right: 2px;
	}

	.disabled {
		background-color: #CCC !important;
	}
	.forbidden {
		cursor: url('../assets/forbidden.png'), auto !important;
	}

</style>