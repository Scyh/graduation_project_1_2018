<template>
	<footer class="footer">
		<div class="container">
			<div class="row">
				<div class="col-md-4 col-lg-4">
						<div class="widget widget-news">
							<div class="widget-header">
								<h3>最新文章</h3>
							</div>
							<div class="widget-content">
								<div class="post">
									<a href="#">这里是最新文章</a>
									<data>2017年02月20日</data>
								</div>
								<div class="post">
									<a href="#">这里是最新文章</a>
									<data>2017年02月20日</data>
								</div>
								<div class="post">
									<a href="#">这里是最新文章最新文章</a>
									<data>2017年02月20日</data>
								</div>
							</div>
						</div>						
					</div>
					<div class="col-md-4 col-lg-4">
						<div class="widget widget-cloud">
							<div class="widget-header">
								<h3>技术栈</h3>
							</div>
							<div class="widget-content">
								<span>...</span>
							</div>
						</div>
					</div>
					<div class="col-md-4 col-lg-4">
						<div class="widget widget-link">
							<div class="widget-header">
								<h3>友情链接</h3>
							</div>
							<div class="widget-content">
								<div class="post">
									<a href="#">Bootstrap中文网</a>
									<a href="#">开放CDN服务</a>
									<a href="#">中文网</a>
									<a href="#">中文网</a>
								</div>
								<div class="post">
									<a href="#">中文文档</a>
									<a href="#">jQuery中文文档</a>
								</div>
								<div class="post">
									<a href="#">又拍云</a>
									<a href="#">乐视云</a>
								</div>
							</div>
						</div>
					</div>
			</div>
		</div>
	</footer>
</template>
<style scoped>
	.footer {
		text-align: left;
		background-color: #202020;
	}
	.footer .widget {
		padding: 35px;
	}
	.footer .widget h3 {
		padding-bottom: 4px;
		border-bottom: 1px solid #EBEBEB;
	}
	.widget h3::after {
		content: '';
		position: relative;
		top: 5px;
		display: block;
		width: 90px;
		height: 1px;
		background-color: #41B886;
	}
	.widget-content p:last-child {
		color: #F4645F;
		cursor: pointer;
	}
	.widget-content > div:first-child {
		margin-top: 30px;
	}
	.widget-content > div {
		margin: 5px 0;
		padding: 10px 0;
		background-color: #F4645F;
		color: #FFF;
		text-align: center;
	}
	.widget-content > div:hover {
		background-color: #303030
	}
	.widget div{
		background-color: transparent;
	}
	.widget-header {
		color: #FFF;
	}
	.widget-news .post,
	.widget-link .post {
		text-align: left;
		border-bottom: 1px dashed #505050;
	}
	.widget-news a, 
	.widget-link .post a{
		color: grey;
	}
	data {
		display: block;
		color: #505050;
	}
	.post a:hover {
		color: #41B886;
		text-decoration: none;
	}

	.widget-cloud .widget-content span {
		color: #FFF;
		padding: 8px;
	}
	.widget-cloud .widget-content span:hover,
	.widget-link .post a:hover {
		background-color: #41B886;
		color: #FFF;
	}
	.widget-link .post a {
		display: inline-block;
		padding: 4px 10px;
	}
</style>