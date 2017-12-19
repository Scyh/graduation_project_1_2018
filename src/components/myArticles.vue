<template>
	<div id="myArticles">
		<ul>
			<template v-for="item in myArticles">
				<li>
					<router-link :to="{path: '/' +userName + '/articles/' + item._id}">{{ item.article_title }}</router-link>
					<span>
						{{ item.article_publish_date }}
					</span>
				</li>
			</template>
		</ul>
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
</style>