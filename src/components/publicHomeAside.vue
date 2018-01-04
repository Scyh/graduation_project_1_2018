<template>
	<div id="aside">
		<div class="widget widget-info">
			<div class="widget-header">
				<img v-if="!currentArticleAuthorInfo.userProfile" src="../assets/index.png">
				<img v-else :src="currentArticleAuthorInfo.userProfile">

				<h4><router-link :to="'/' + currentArticleAuthorInfo.username + '/publicHome' ">{{ currentArticleAuthorInfo.username}}</router-link></h4>
				<br />
				<span class="user-introduce">
					{{ currentArticleAuthorInfo.introduce?currentArticleAuthorInfo.introduce:'这家伙很懒，什么都没有留下' | introduceDecoration}}
				</span>

				<br />
				<dl>
					<dt>文章</dt>
					<dd>
						{{ getMyArticles.length }}
					</dd>
				</dl>
				<dl>
					<dt>提问</dt>
					<dd>0</dd>
				</dl>
			</div>
			<div class="widget-body">
				<div class="widget-meta">
					<span>他的相关文章</span>
					<span>更多文章</span>
				</div>
				<ul>
					<template v-for="(item, index) in getMyArticles">
						<li v-if="index<4">
							<router-link :to="'/' + currentArticleAuthorInfo.username + '/articles/' + item._id">{{ item.article_title }}</router-link>
						</li>
					</template>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data: function() {
			return {
				currentArticleAuthorInfo: {},
				getMyArticles: []
			}
		},
		props: {
			name: {
				type: String,
				required: true
			}
		},
		mounted: function () {
			// console.log(this.name)
			// 异步获取时，数据尚未传来，会渲染失败
			if (!this.name) {
				setTimeout(()=>{
					this.initAuthorInfo(this.name)
				},100)
			} else {
				this.initAuthorInfo(this.name)
				
			}
			
		},
		methods: {
			initAuthorInfo: function (username) {
				let that = this;
				$.get('http://localhost:3000/api/getUserInfo', {username: username})
					.then((data=>{
						for (let i in data) {
							that.currentArticleAuthorInfo[i] = data[i]
						}
						that.currentArticleAuthorInfo = that.currentArticleAuthorInfo[0]
					}))
					.then(()=>{
						that.getMyArticles = [];
						$.get('http://localhost:3000/api/getMyArticles',{
							username: username,
							audit: 'audited'
						},  function(data) {
							// that.currentArticleAuthorInfo.articleLength = data.length
							// console.log(that.currentArticleAuthorInfo.articleLength)
							for (let i in data) {
								that.getMyArticles.push(data[i])	
							}
							// console.log(data)
							that.$emit('allArticles', data);
						});
					})
			},
		},
	}
</script>
<style scoped>
	.widget {
		background-color: #FFF;
	}
	.widget-header {
		padding: 15px;
		border-bottom: 1px solid #CCC;
	}
	.widget-header img {
		width: 80px;
		height: 80px;
		border-radius: 50%;
	}
	.widget-header h4 {
		display: inline-block;
		font-weight: bold;
		margin-left: 10px;
	}
	.widget-header dl {
		display: inline-block;
		margin: 10px 30px 0 10px;
	}
	.widget-header dt {
		color: #788087;
		font-weight: normal;
		text-align: center;
	}
	.widget-header dd {
		text-align: center;
	}
	.widget-meta {
		padding: 15px 0 0 15px;
	}
	.widget-meta span {
		display: inline-block;
	}
	.widget-meta span:first-child {
		margin-left: 8px;
		font-size: 18px;
	}
	.widget-meta span:last-child {
		float: right;
		margin-right: 30px;
	}
	.widget-meta::before {
		content: '';
		position: absolute;
		left: 25px;
		display: inline-block;
	    width: 6px;
	    height: 20px;
		background-color: #009A61;
	}
	ul {
		list-style: none;
		padding: 25px 10px;
	}
	ul li {
		padding: 8px 0;
	}
	.user-introduce {
		display: inline-block;
		margin: 8px 0 0 8px;
	}
</style>