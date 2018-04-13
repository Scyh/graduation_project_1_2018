<template>
	<div id="indexAside">
		<aside>
			
			<!-- 轮播 -->
			<div class="widget">
				<div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
				    <ol class="carousel-indicators">
				        <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
				        <li data-target="#carousel-example-generic" data-slide-to="1"></li>
				        <li data-target="#carousel-example-generic" data-slide-to="2"></li>
				  	</ol>

				  <!-- Wrapper for slides -->
					<div class="carousel-inner" role="listbox">
						<div class="item active">
							<img src="../assets/banner-img1.jpg" class="img-responsive">
							<div class="carousel-caption"></div>
						</div>
						<div class="item">
							<img src="../assets/banner-img2.jpg" class="img-responsive">
							<div class="carousel-caption"></div>
						</div>
						<div class="item">
							<img src="../assets/banner-img3.jpg" class="img-responsive">
							<div class="carousel-caption"></div>
						</div>
					</div>

				  <!-- Controls -->
				  <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
				    <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
				    <span class="sr-only">Previous</span>
				  </a>
				  <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
				    <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
				    <span class="sr-only">Next</span>
				  </a>
				</div>
			</div>

			<div class="widget">
				<h4>公告<span class="glyphicon glyphicon-pushpin"></span></h4>
				<div class="widget_content" v-for="item in announcement">
					
					<!-- <div :id="item._id" class="widget_article_title">
						{{ item.announcement_title.slice(0,10) }}...
						<span>
							{{ item.announcement_date | getDate }}
						</span>
					</div> -->

					<router-link :to="{path: '/announcement', query: {id: item._id}}" class="widget_article_title">
						{{ item.announcement_title.slice(0,10) }}...
						<span>
							{{ item.announcement_date | getDate }}
						</span>
					</router-link>
					

				</div>	
			</div>
			<div class="widget">
				<h4>热门文章 <span class="glyphicon glyphicon-fire"></span></h4>
				<div class="widget_content" v-for="item in hotArticle">
					<!-- <div :id="item._id" class="widget_article_title">
						{{  item.article_title  }}
					</div> -->
					<router-link :to="{path: '/' + item.article_author + '/articles/' +item._id}" class="widget_article_title">
					{{  item.article_title  }}
				</router-link>	
				</div>
			</div>
		</aside>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				announcement: [],
				hotArticle: []
			}
		},
		mounted() {
			this.initAnnouncement()
		},
		methods: {
			initAnnouncement() {
				let that = this;
				$.get('http://localhost:3000/api/getAnnouncementAndHotArticle', function(data) {
					if (data.announcement && data.hotArticle) {
						that.announcement = data.announcement;
						that.hotArticle = data.hotArticle
					}
				});
			}
		},
	}
</script>
<style scoped>
	.widget {
		padding: 30px;
		margin-bottom: 15px;
		background: #FFF;
	}
	.widget h4 span {
		margin-left: 10px;
	}
	.widget_article_title {
		position: relative;
		display: inline-block;
		padding: 10px;
		border-bottom: 1px solid #EEE;
		cursor: pointer;
		color: #000;
	}
	.widget_article_title span{
		/*position: absolute;
		right: 0;
		bottom: 10px;*/
	}
	.widget_article_title:hover {
		background-color: #F5F5F5;
		text-decoration: none;
		/*color: #999*/
	}
	.widget_content {
		position: relative;
	}
	.carousel-inner img {
		height: 190px;
	}
	.carousel-control {
		background:  0 0!important;
	}
</style>