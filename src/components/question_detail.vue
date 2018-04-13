<template>
	<div>
		<div class="container">
			<div class="row question-wrap">
				<div class="row">
					<div class="question-detail-title">
						<div class="col-lg-1 col-md-1 col-sm-1">
							<span class="question-logo">问</span>
						</div>
						<div class="col-lg-11 col-md-11 col-sm-11">
							<h2>vue watch能不能监听整个props值的变化呢？</h2>
								<p>
									<span class="question-category">javascript</span>
									<span class="question-author">xxx</span>
									<span class="question-data">xx-xx-xx 提问</span>
								</p>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="question-detail-body">
							<div class="col-lg-1 col-md-1 col-sm-1">
									解决？
							</div>
							<div class="col-lg-11 col-md-11 col-sm-11 question-text">
									<p>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
							</div>
					</div>
				</div>	
			</div>
				
			<div class="row">
				<div class="answers">
					<div class="answers-title">
						<h3>0个回答</h3>
					</div>
					<div class="answer-body">
						<div class="row answer">
							<div class="col-lg-1 col-md-1 col-sm-1">
							xxx
							</div>
							<div class="col-lg-11 col-md-11 col-sm-11">
								<div>
									<p class="answer-text">当然是你请求的接口返回给你的，你请求的这个接口计算了json文件数组的长度，你请求此接口，返回json列表的下标、下标对应的值以及json列表的length给你。</p>
									<div class="answer-meta">
										<span>xx-xx-xx时间</span>
										<span @click="showCommentForm">0评论</span>
										<span class="pull-right">xxx</span>
									</div>
									<div class="answer-comment">
										<div class="row">
											<div class="col-md-10 col-lg-10">
												<textarea class="form-control" placeholder="不要在评论中回答问题"></textarea>
											</div>
											<div class="col-md-2 col-lg-2">
												<button class="btn">提交评论</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			
		</div>


	</div>
</template>
<script>
	export default {
		methods: {
			showCommentForm(ev) {
				$(ev.target).parent().next('.answer-comment').toggle()
			}
		}
	}
</script>
<style scoped>
	.question-wrap {
		padding: 20px 0 25px;
		border-bottom: 2px solid #ccc;
		font-size: 16px;
	}
	.question-detail-title, 
	.question-detail-body {
		overflow: hidden;
	}
	.question-detail-title {
		margin: 20px 0;
		padding-bottom: 20px;
		border-bottom: 1px solid #eee;
	}
	.question-detail-body {
		margin: 20px 0;
	}
	.question-logo {
		margin-right: 15px;
		padding: 5px;
		font-size: 18px;
		border: 1px solid #41B886;
		color: #41B886;
		font-weight: 400;
		border-radius: 50%;
	}
	.question-category {
		font-size: 12px;
		background-color: rgba(1,126,102,0.08);
		color: #017E66;
		display: inline-block;
		padding: 0 8px;
		line-height: 22px;
		cursor: pointer;
	}
	.question-author {
		margin: 0 10px;
		color: #009a61;
		font-weight: 600;
	}
	.question-detail-title p > span:last-child {
		color: #ccc;
		font-size: 14px;
	}
	.answers {
		margin: 85px 0 30px 0;
	}
	.answers-title {
		margin-bottom: 20px;
		border-bottom: 2px solid #ccc;
	}
	.answer {
		padding: 20px 0;
		border-bottom: 1px solid #ccc;
	}
	.answer-text {
		min-height: 55px;
		font-size: 16px;
	}
	.answer-meta {
		font-size: 14px;
		color: #ccc;
	}
	.answer-meta span:nth-child(2) {
		cursor: pointer;
	}
	.answer-comment {
		margin-top: 15px;
		display: none;
	}
	.answer-comment textarea {
		min-height: 40px;
		resize: vertical;
	}
</style>