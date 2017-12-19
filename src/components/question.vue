<template>
	<div class="section3">
		<div class="container">
			<div class="row">
				<div class="col-md-8 col-lg-8">
					<main>
						<article>
							<div class="question_label">html</div>
							<div class="question_title">这是文章的标题这是文章的标题这是文章的标题这是文章的标题</div>
							<div class="question_push_date">发布时间</div>
							<div class="question_author">作者</div>
						</article>
						<article>
							<div class="question_label">html</div>
							<div class="question_title">这是文章的标题这是文章的标题这是文章的标题这是文章的标题</div>
							<div class="question_push_date">发布时间</div>
							<div class="question_author">作者</div>
						</article>
						<article>
							<div class="question_label">html</div>
							<div class="question_title">这是文章的标题这是文章的标题这是文章的标题这是文章的标题</div>
							<div class="question_push_date">发布时间</div>
							<div class="question_author">作者</div>
						</article>
						<article>
							<div class="question_label">html</div>
							<div class="question_title">这是文章的标题这是文章的标题这是文章的标题这是文章的标题</div>
							<div class="question_push_date">发布时间</div>
							<div class="question_author">作者</div>
						</article>
						<article>
							<div class="question_label">html</div>
							<div class="question_title">这是文章的标题这是文章的标题这是文章的标题这是文章的标题</div>
							<div class="question_push_date">发布时间</div>
							<div class="question_author">作者</div>
						</article>
						<article>
							<div class="question_label">html</div>
							<div class="question_title">这是文章的标题这是文章的标题这是文章的标题这是文章的标题</div>
							<div class="question_push_date">发布时间</div>
							<div class="question_author">作者</div>
						</article>
						<article>
							<div class="question_label">html</div>
							<div class="question_title">这是文章的标题这是文章的标题这是文章的标题这是文章的标题</div>
							<div class="question_push_date">发布时间</div>
							<div class="question_author">作者</div>
						</article>
						<article>
							<div class="question_label">html</div>
							<div class="question_title">这是文章的标题这是文章的标题这是文章的标题这是文章的标题</div>
							<div class="question_push_date">发布时间</div>
							<div class="question_author">作者</div>
						</article>
						<article>
							<div class="question_label">html</div>
							<div class="question_title">这是文章的标题这是文章的标题这是文章的标题这是文章的标题</div>
							<div class="question_push_date">发布时间</div>
							<div class="question_author">作者</div>
						</article>
						<article>
							<div class="question_label">html</div>
							<div class="question_title">这是文章的标题这是文章的标题这是文章的标题这是文章的标题</div>
							<div class="question_push_date">发布时间</div>
							<div class="question_author">作者</div>
						</article>
						<article>
							<div class="question_label">html</div>
							<div class="question_title">这是文章的标题这是文章的标题这是文章的标题这是文章的标题</div>
							<div class="question_push_date">发布时间</div>
							<div class="question_author">作者</div>
						</article>
						<article>
							<div class="question_label">html</div>
							<div class="question_title">这是文章的标题这是文章的标题这是文章的标题这是文章的标题</div>
							<div class="question_push_date">发布时间</div>
							<div class="question_author">作者</div>
						</article>
						<article>
							<div class="question_label">html</div>
							<div class="question_title">这是文章的标题这是文章的标题这是文章的标题这是文章的标题</div>
							<div class="question_push_date">发布时间</div>
							<div class="question_author">作者</div>
						</article>
						<article>
							<div class="question_label">html</div>
							<div class="question_title">这是文章的标题这是文章的标题这是文章的标题这是文章的标题</div>
							<div class="question_push_date">发布时间</div>
							<div class="question_author">作者</div>
						</article>
						<article>
							<div class="question_label">html</div>
							<div class="question_title">这是文章的标题这是文章的标题这是文章的标题这是文章的标题</div>
							<div class="question_push_date">发布时间</div>
							<div class="question_author">作者</div>
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
	},

}
</script>

<style scoped>
	.section3 {
		padding-top: 60px;
		background: url('../assets/bj.png');
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
	.question_label {
		background-color: #E5E5E5;
		padding: 2px;
		font-size: 14px;
	}
	.question_title {
		font-size: 18px
	}
	.question_author {
		float: right;
	}
	.question_push_date {
		float: right;
	}
	.widget {
		padding: 15px;
	}
</style>