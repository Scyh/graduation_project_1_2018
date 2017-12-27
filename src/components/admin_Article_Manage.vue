<template>
	<div id="admin_Article_Manage">
		<table class="table">
			<thead>
				<tr>
					<th>#</th>
					<th>标题</th>
					<th>作者</th>
					<th>上传时间</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody>
				<template v-for="(item, index) in articles">
					<tr>
						<th>{{ index +1 }}</th>
						<th>{{ item.article_title }}</th>
						<th>{{ item.article_author }}</th>
						<th>{{ item.article_publish_date | getDate }}</th>
						<th>
							<button class="btn">查看</button>
							<button class="btn">删除</button>
						</th>
					</tr>
				</template>
			</tbody>
		</table>

		<nav aria-label="Page navigation">
			<ul class="pagination">
				<li>
				    <a href="javascript:void(0)" @click="change()" title="首页">
			        <span class="glyphicon glyphicon-backward"></span>
			    	</a>
			    </li>
			    <li>
				    <a href="javascript:void(0)" @click="change('prev')" title="前一页">
			        <span class="glyphicon glyphicon-chevron-left"></span>
			    	</a>
			    </li>
			    <li class="jump-to">
			    	<a href="javascript:void(0)" @click="change()" title="跳转">
			        <span><input type="text" placeholder="跳转"></span>
			      </a>
				    
			    </li>
			    <li>
				    <a href="javascript:void(0)" @click="change('next')" title="后一页">
			        <span class="glyphicon glyphicon-chevron-right"></span>
			        </a>
			    </li>
			    <li>
				    <a href="javascript:void(0)" @click="change()" title="尾页">
			        <span class="glyphicon glyphicon-forward"></span>
			    	</a>
			    </li>
		    </ul>
		</nav>

	</div>
</template>
<script>
	import bus from '../bus.js'
	export default {
		data () {
			return {
				articles: [],
				currentPage: 1,
				type: 'all',
				maxPage: 1,
			}
		},
		mounted () {
			sessionStorage.articlePage = 1;
			this.init('all', 1);
			bus.$on('type', data => {
				// console.log("文章筛选" + data)
				sessionStorage.articlePage = 1;
				this.currentPage = sessionStorage.articlePage;
				this.type = data;
				this.init(data, this.currentPage);
			})
		},
		methods: {
			init (type, page) {
				let that = this;
				that.type = type;
				$.get('http://localhost:3000/api/admin/getArticle', {
					type: type,
					page: page
				}, function(data) {
					// console.log(data)
					// data.forEach(i => {
					// 	that.articles.push(data[i])
					// })
					that.articles = data.articles;
					that.maxPage = Math.ceil(data.count / 8);
					console.log(data)
				});
			},

			change (type) {

				if (type == 'prev') {
					if (sessionStorage.articlePage > 1) {
						
						this.currentPage = sessionStorage.articlePage --
						this.init(this.type, sessionStorage.articlePage)
					}
					
				} else if (type == 'next'){
					console.log(this.type)
					console.log(sessionStorage.articlePage < this.maxPage)
					if (sessionStorage.articlePage < this.maxPage) {
						this.currentPage = sessionStorage.articlePage ++
						this.init(this.type, sessionStorage.articlePage)
					}
				}
			},
		}

	}
</script>
<style scoped>
	.jump-to a {
		margin: 0;
		padding: 0;
	}
	.jump-to input {
		width: 38px;
		height: 32px;
		text-align: center;
	}
</style>