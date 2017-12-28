<template>
	<div>
		<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" id="adminCheckArticleModal">
		    <div class="modal-dialog modal-lg" role="document">
		    	<div class="modal-content">
		    		<div class="modal-header">
		    			<button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
       					<h4 class="modal-title">{{ article.article_title }}</h4>
       					<div class="article-meta">
       						<div class="row">
       							<div class="col-md-offset-4 col-md-5">
       								<span>作者：{{article.article_author}}</span>  
       								<span>发表时间：{{ article.article_publish_date | getDate}}</span>
       							</div>
       						</div>
       						<div class="row">
       							
       						</div>
       					</div>
		    		</div>
		    		<div class="modal-body">
		    			<div class="row">
		    				<div class="col-md-offset-1 col-md-10 article-content">
		    					<p v-html="article.article_content"></p>
		    				</div>
		    			</div>
		    			<div class="row">
		    				<div class="article-meta col-md-offset-1 col-md-10">
		    					<span>文章id：{{ article._id }}</span>
		    					<span>浏览量：{{ article.article_pv }}</span>
		    					<span>主标签：{{ article.category }}</span>
		    					<span>副标签：{{ article.article_label }}</span>
		    				</div>
		    			</div>
		    		</div>
		    		<div class="modal-footer">
		    			<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
        				<!-- <button type="button" class="btn btn-primary">Save changes</button> -->
		    		</div>
		    	</div>
		    </div>
		</div>
	</div>
</template>
<script>
	import bus from '../bus.js'
	export default {
		data () {
			return {
				article: {}
			}
		},	// data end
		mounted () {
			bus.$on('transferArticle_id', data => {
				this.init(data)
			})
		},	// mounted end
		methods: {
			init (id) {
				let that = this;
				$.get('http://localhost:3000/api/getOneArticle', {
					article_id: id
				}, function(data) {
					that.article = data;
				});
			}
		},	// methods end
	}
</script>
<style scoped>
	.modal-header {
		padding-bottom: 0;
	}
	.modal-title {
		text-align: center;
		font-size: 20px;
	}
	.modal-body {
		padding: 30px 30px 0;
	}
	.article-content {
		min-height: 400px;
		padding-bottom: 15px;
	}
	.article-meta {
		padding: 15px;
		color: #999;
	}
	.article-meta span {
		margin-right: 15px;
	}
</style>