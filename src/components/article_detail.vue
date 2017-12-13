<template>
		<div class="article">
			<div class="container">
				<div class="row">
					<div class="col-md-12">
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
						<div class="article-comment">
							<div v-if="!hasLogIn">
								<p>目前您尚未登录，请<b>登录</b>或<b>注册</b>后进行评论</p>
							</div>
							<div v-else>
								<!-- <p>尚未有评论！</p> -->
								<div v-for="item in comments">
									{{ item }}
								</div>
							</div>
						</div>
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
				article_comment:'',
			}
		},
		computed: {
			...mapGetters([
				'hasLogIn'
			]),
			comments: function() {
				// return JSON.parse(JSON.stringify(this.article_comment))
			},
		},
		mounted: function() {
			this.initArticle();
			this.initComment();
			console.log(this.article_comment)
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
					// console.log(data)

					// 没有评论
					if (data.status == 'noComment') {

					} else if (data.status == 'hasComment') {
						console.log(data)
						that.article_like = data.article_like;
						that.article_comment = data.article_comment
					}
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
</style>