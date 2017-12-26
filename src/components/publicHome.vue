<template>
	<div id="publiceHome">
		<div class="container">
			<div class="row allArticles">
				<div class="col-md-8 row-left">
					<div>
						<p>他的所有文章</p>
						<ul>
							<template v-for="item in allArticles">
								<li>
									<router-link :to="'/' + viewName + '/articles/' + item._id">{{ item.article_title }}</router-link>

									<!-- 可能需要判断是否开头截取的内容中有图片，如果有，需要去除掉 -->
									<p v-html="item.article_content.slice(0,80)"></p>
									<span>
										{{ item.article_publish_date | getDate }}
									</span>
								</li>
							</template>
						</ul>
					</div>
				</div>

				<div class="col-md-4">
					<cusAside :name="viewName" @allArticles="initAllArticles($event)"></cusAside>	
				</div>
			</div>
		</div>
	</div>
</template>
<script>

	import cusAside from './aside.vue'

	export default {
		data: function () {
			return {
				allArticles:[]
			}
		},
		computed: {
			viewName() {
				return this.$route.params.username
			}
		},
		mounted: function () {
			console.log(this.viewName);
		},
		methods: {
			initAllArticles: function (data) {
				this.allArticles = data
			}
		},
		components: {
			cusAside
		}
	}
</script>
<style scoped>
	#publiceHome {
		background-image: url(../assets/bj.png);
	}
	.row-left {
		background-color: #FFF;
		min-height: 600px;
	}
	.allArticles {
		padding: 15px 0;
	}
	.allArticles p {
		padding: 15px 0 0 15px;
		color: #999;
		font-size: 17px;
	}
	.allArticles ul {
		padding-left: 15px;
		list-style: none;
	}
	.allArticles ul li {
		padding: 15px 0;
		border-bottom: 1px dashed #CCC;
	}
	.allArticles ul span {
		display: inline-block;
		padding-left: 15px;
		color: #999;
	}
</style>