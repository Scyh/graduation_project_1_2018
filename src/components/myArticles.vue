<template>
	<div id="myArticles">
		<ul>
			<li class="article-filter">
				<span class="activeFilter" @click="initMyArticles('all', $event)">文章：&nbsp;{{ articleLength }}</span>
				<span @click="initMyArticles('audited', $event)">已审核</span>
				<span @click="initMyArticles('notAudit', $event)">审核中</span>
			</li>
		</ul>

			<template v-if="hasArticle">
				<li  v-for="item in myArticles">
					<router-link :to="{path: '/' +userName + '/articles/' + item._id}">{{ item.article_title }}</router-link>
					<span>
						{{ item.article_publish_date | getDate}}
					</span>
				</li>
			</template>
			<template v-else>
				<p class="hasNoArticle">
					<span class="glyphicon glyphicon-th-list"></span>尚未发表文章！
				</p>
			</template>

	</div>
</template>
<script>
	export default {
		data: function() {
			return {
				myArticles: []
			}
		},
		props: {
			userName: {
				type: String,
				required: true
			}
		},
		computed: {
			hasArticle: function () {
				return this.myArticles.length>0?true:false	
			},
			articleLength() {
				return this.myArticles.length
			}
		},
		mounted: function() {
			this.initMyArticles('all');
		},
		methods: {
			// 初始化个人主页的文章tab
			initMyArticles: function(audit, event) {
				let that = this;
				that.myArticles = [];
				$.get('http://localhost:3000/api/getMyArticles', {
					username: that.userName,
					audit: audit
				}, function(data) {
					for (let i in data) {
						that.myArticles.push(data[i]);
					}
					if (event) {
						$(event.target).addClass('activeFilter').siblings().removeClass('activeFilter')	
					}
					
					
				});
			},
		}
	}
</script>
<style scoped>
	ul {
		padding-left: 16px;
	}
	li {
		list-style-type: none;
		padding: 20px 0;
		
		border-bottom: 1px solid #EEE;
	}
	li:not(:first-child) span {
		float: right;
		margin-right: 10px;
		color: #999;
	}
	.article-filter span {
		position: relative;
		margin-right: 15px;
		cursor: pointer;
	}
	.article-filter span:first-child {
		color: #349edf;
	}
	.hasNoArticle {
		position: absolute;
		top: 0;
	    left: 0;
	    right: 0;
	    bottom: 0;
	    transform: translate(50%,50%);
	    font-size: 18px;
	}
	.hasNoArticle span {
		margin-right: 10px;
	}
	.activeFilter::after {
		content: '';
		display: inline-block;
		position: absolute;
		bottom: -10px;
		left: 10px;
		border-bottom: 5px solid #41B886;
		border-left: 10px solid transparent;
		border-right: 10px solid transparent;
	}
</style>