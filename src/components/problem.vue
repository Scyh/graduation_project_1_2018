<template>
	<div class="section3">
		<div class="container">
			<div class="row">
				<div class="col-md-8 col-lg-8">
					<main>
						<article>
							<div class="article_label">html</div>
							<div class="article_title">这是文章的标题这是文章的标题这是文章的标题这是文章的标题</div>
							<div class="article_push_date">发布时间</div>
							<div class="article_author">作者</div>
						</article>
						<article>
							<div class="article_label">html</div>
							<div class="article_title">这是文章的标题这是文章的标题这是文章的标题这是文章的标题</div>
							<div class="article_push_date">发布时间</div>
							<div class="article_author">作者</div>
						</article>
						<article>
							<div class="article_label">html</div>
							<div class="article_title">这是文章的标题这是文章的标题这是文章的标题这是文章的标题</div>
							<div class="article_push_date">发布时间</div>
							<div class="article_author">作者</div>
						</article>
						<article>
							<div class="article_label">html</div>
							<div class="article_title">这是文章的标题这是文章的标题这是文章的标题这是文章的标题</div>
							<div class="article_push_date">发布时间</div>
							<div class="article_author">作者</div>
						</article>
						<article>
							<div class="article_label">html</div>
							<div class="article_title">这是文章的标题这是文章的标题这是文章的标题这是文章的标题</div>
							<div class="article_push_date">发布时间</div>
							<div class="article_author">作者</div>
						</article>
						<article>
							<div class="article_label">html</div>
							<div class="article_title">这是文章的标题这是文章的标题这是文章的标题这是文章的标题</div>
							<div class="article_push_date">发布时间</div>
							<div class="article_author">作者</div>
						</article>
						<article>
							<div class="article_label">html</div>
							<div class="article_title">这是文章的标题这是文章的标题这是文章的标题这是文章的标题</div>
							<div class="article_push_date">发布时间</div>
							<div class="article_author">作者</div>
						</article>
						<article>
							<div class="article_label">html</div>
							<div class="article_title">这是文章的标题这是文章的标题这是文章的标题这是文章的标题</div>
							<div class="article_push_date">发布时间</div>
							<div class="article_author">作者</div>
						</article>
						<article>
							<div class="article_label">html</div>
							<div class="article_title">这是文章的标题这是文章的标题这是文章的标题这是文章的标题</div>
							<div class="article_push_date">发布时间</div>
							<div class="article_author">作者</div>
						</article>
						<article>
							<div class="article_label">html</div>
							<div class="article_title">这是文章的标题这是文章的标题这是文章的标题这是文章的标题</div>
							<div class="article_push_date">发布时间</div>
							<div class="article_author">作者</div>
						</article>
						<article>
							<div class="article_label">html</div>
							<div class="article_title">这是文章的标题这是文章的标题这是文章的标题这是文章的标题</div>
							<div class="article_push_date">发布时间</div>
							<div class="article_author">作者</div>
						</article>
						<article>
							<div class="article_label">html</div>
							<div class="article_title">这是文章的标题这是文章的标题这是文章的标题这是文章的标题</div>
							<div class="article_push_date">发布时间</div>
							<div class="article_author">作者</div>
						</article>
						<article>
							<div class="article_label">html</div>
							<div class="article_title">这是文章的标题这是文章的标题这是文章的标题这是文章的标题</div>
							<div class="article_push_date">发布时间</div>
							<div class="article_author">作者</div>
						</article>
						<article>
							<div class="article_label">html</div>
							<div class="article_title">这是文章的标题这是文章的标题这是文章的标题这是文章的标题</div>
							<div class="article_push_date">发布时间</div>
							<div class="article_author">作者</div>
						</article>
						<article>
							<div class="article_label">html</div>
							<div class="article_title">这是文章的标题这是文章的标题这是文章的标题这是文章的标题</div>
							<div class="article_push_date">发布时间</div>
							<div class="article_author">作者</div>
						</article>
					</main>
				</div>
				<div class="clo-md-4 col-lg-4">
					<aside>
						<div class="widget">
							<h3>侧栏标题</h3>

							<div class="widget_content">侧栏内容</div>
						</div>
					</aside>
				</div>
			</div> <!-- .row 结束 -->
		</div> <!-- container 结束 -->
	</div>
</template>

<script>
import $ from 'jquery'

export default {
	data: function() {
		return {
			articles: {}
		}
	},
	beforeCreate: function() {
		console.log('beforeCreate');

		// 获取所有文章
		// $.ajax({
		// 	url: 'http://localhost:3000/api/getArticle',
		// 	type: 'get',
		// 	dataType: 'JSON',
		// })
		// .done(function(data) {
		// 	console.log("success");
		// 	this.articles = data;
		// 	console.log(this.articles)
		// })
		// .fail(function(err) {
		// 	console.log("error: " + err);
		// })
		// .always(function() {
		// 	console.log("complete");
		// });
	},

}
</script>

<style scoped>
	.section3 {
		padding-top: 60px;
		/*background-color: #EFEFEF;*/
	}
	.container main,
	.container .widget{
		background-color: #FFF;
		box-shadow: 0 0 10px 5px #EEE;
	}
	article {
		padding: 15px;
		border-bottom: 1px solid #EEE
	}
	article > *{
		display: inline-block;
	}
	.article_label {
		background-color: #E5E5E5;
		padding: 2px;
		font-size: 14px;
	}
	.article_title {
		font-size: 18px
	}
	.article_author {
		float: right;
	}
	.article_push_date {
		float: right;
	}
	.widget {
		padding: 15px;
	}
</style>