<template>
	<div id="indexAside">
		<aside>
			<div class="widget">
				<h4>公告</h4>
				<div class="widget_content" v-for="item in announcement">
					<div :id="item._id" class="widget_article_title">{{ item.announcement_title }}...</div>	
				</div>
			</div>
			<div class="widget">
				<h4>热门文章</h4>
				<div class="widget_content" v-for="item in hotArticle">
					<div :id="item._id" class="widget_article_title">{{
						item.article_title
					}}</div>
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
	.widget_article_title {
		padding: 10px;
		border-bottom: 1px solid #EEE;
		cursor: pointer;
	}
	.widget_article_title:hover {
		background-color: #F5F5F5;
	}
</style>