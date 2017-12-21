<template>
	<div id="myArticles">
		<ul v-if="hasArticle">
			<template v-for="item in myArticles">
				<li>
					<router-link :to="{path: '/' +userName + '/articles/' + item._id}">{{ item.article_title }}</router-link>
					<span>
						{{ item.article_publish_date }}
					</span>
				</li>
			</template>
		</ul>

		<p v-else class="hasNoArticle">
			<span class="glyphicon glyphicon-th-list"></span>尚未发表文章！
		</p>
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
			}
		},
		mounted: function () {
			this.initMyArticles();
		},
		methods: {
			// 初始化个人主页的文章tab
			initMyArticles: function () {
				let that = this;
				$.get('http://localhost:3000/api/getMyArticles', {
					username: that.userName
				}, function(data) {
					for (let i in data) {
						that.myArticles.push(data[i]);
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
	li span {
		float: right;
		margin-right: 10px;
		color: #999;
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
</style>