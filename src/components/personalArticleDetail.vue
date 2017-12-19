<template>
	<div id="personalArticleDetail">
		<div class="container">
			<div class="row">
				<div class="col-md-8 article-wrap">
					<article>

						<div class="article-header">
							<h2>{{ article.article_title }}</h2>
							<div class="article-meta">
								<span>作者：{{ article.article_author }}</span>
								<span>&nbsp;&nbsp;&nbsp;&nbsp;发布于：{{ article.article_publish_date }}&nbsp;&nbsp;</span>
								<span class="article_pv">{{ article.article_pv }}</span>
							</div>
						</div>
						<div class="article-body" v-html="article.article_content"></div>
						<div class="article-footer">
							<span>{{ article.article_label }}</span>
						</div>
					</article>
				</div>

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
		</div>
	</div>
</template>
<script>
	export default {
		data: function () {
			return {
				article: []
			}
		},
		mounted: function () {
			this.initPersonArticle()
			// console.log(this.$route.params)
			console.log(this.article)
		},
		methods: {
			initPersonArticle: function () {
				let that = this;
				$.get('http://localhost:3000/api/getOneArticle',{ 
					article_id: that.$route.params.id
				}, function(data) {
					console.log(data)
						// for (let i in data) {
						// 	that.article[i] = data[i];
						// }	
						that.article = data	
					});		
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
	.comment-list li span:last-child {
		padding: 10px 0;
		padding-left: 32px;
		margin-bottom: 0;
	}
	.comment-list li span:last-child,
	.comment-list li span:nth-child(2) {
		color: #08C;
	}
	.comment-list li span:last-child {
		cursor: pointer;
	}
	.comment-list li span:last-child:hover {
		color: #009A61;
	}
</style>