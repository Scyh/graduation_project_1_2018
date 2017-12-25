<template>
	<div id="publiceHome">
		<div class="container">
			<div class="row">
				<div class="col-md-8">
					<div class="allArticle">
						<ul>
							<template v-for="item in allArticles">
								<li>
									<router-link :to="'/' + viewName + '/articles/' + item._id">{{ item.article_title }}</router-link>
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
<style>
	
</style>