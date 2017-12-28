<template>
	<div id="admin_Article_Manage">

		<table class="table">
			<thead>
				<tr>
					<th>#</th>
					<th>标题</th>
					<th>作者</th>
					<th>上传时间</th>
					<th>审核状态</th>
					<th>操作<span class="glyphicon glyphicon-refresh refresh" @click="init(type,currentPage)"></span></th>
				</tr>
			</thead>
			<tbody>
				<template v-for="(item, index) in articles">
					<tr :id="item._id">
						<th>{{ index +1 }}</th>
						<th>{{ item.article_title }}</th>
						<th>{{ item.article_author }}</th>
						<th>{{ item.article_publish_date | getDate }}</th>
						<th>
							{{ item.article_audit | translate }}
							<span class="glyphicon glyphicon-paperclip audit" v-if="item.article_audit == 'notAudit'" @click="audit($event)"></span>
						</th>
						<th>
							<button class="btn" data-toggle="modal" data-target="#adminCheckArticleModal" @click="transfer($event)">查看</button>
							<button class="btn" :data-id="item._id" @click="confirm($event)">删除</button>
						</th>
					</tr>
				</template>
			</tbody>
		</table>

		<nav aria-label="Page navigation">
			<ul class="pagination">
				<li>
				    <a href="javascript:void(0)" @click="init(type,1)" title="首页">
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
				    <a href="javascript:void(0)" @click="init(type,maxPage)" title="尾页">
			        <span class="glyphicon glyphicon-forward"></span>
			    	</a>
			    </li>
		    </ul>
		</nav>

		<div class="modal fade bs-example-modal-sm" tabindex="-1" id="confirmModal">
		    <div class="modal-dialog modal-sm" role="document">
		        <div class="modal-content">
		     		<div class="modal-body">
		     			<p>确认删除？</p>
		     		</div>
		     		<div class="modal-footer">
		     			<button type="button" class="btn btn-default" id="cancleDelArticle" data-dismiss="modal">取消</button>
        				<button type="button" class="btn btn-primary" id="confirmDelArticle" @click="deleteArticle($event)" >确认</button>
		     		</div>
		    	</div>
		    </div>
		</div>	<!-- 确认删除 modal end-->


		<adminCheckArticleModal></adminCheckArticleModal>

	</div>
</template>
<script>
	import bus from '../bus.js'
	import adminCheckArticleModal from './admin_check_article_modal.vue'

	export default {
		data() {
			return {
				articles: [],
				currentPage: 1,
				type: 'all',
				maxPage: 1,
			}
		},
		mounted() {
			sessionStorage.articlePage = 1;
			this.currentPage = 1;
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

			init(type, page) {
				// console.log('init')
				// console.log('type:' + type)
				// console.log('page:' + page)
				let that = this;
				that.type = type;
				sessionStorage.articlePage = page;
				this.currentPage = page;
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
				});
			},

			change(type) {

				if (type == 'prev') {
					if (sessionStorage.articlePage > 1) {	
						this.currentPage = sessionStorage.articlePage --
						this.init(this.type, sessionStorage.articlePage)
					}
					
				} else if (type == 'next'){

					if (sessionStorage.articlePage < this.maxPage) {
						this.currentPage = sessionStorage.articlePage ++
						this.init(this.type, sessionStorage.articlePage)
					}
				}
			},

			transfer(event) {
				bus.$emit('transferArticle_id', $(event.target).parent().parent().prop('id'))
			},

			audit(event) {
				let that = this;
				$.post('http://localhost:3000/api/admin/hasAudited', {
					id: $(event.target).parent().parent().prop('id')
				}, function(data, textStatus, xhr) {
					if (data.status == 'success') {
						alert("审核通过成功");
						that.init(that.type, that.currentPage)
					} else if (data.status == 'fail'){
						alert("审核通过失败")
					}
				});
			},	// audit end

			confirm(event) {
				$("#confirmModal").modal('toggle').find('#confirmDelArticle').attr('data-id', $(event.target).data().id);
			},	// confir end

			deleteArticle(event) {
				let that = this;
				$.post('http://localhost:3000/api/deleteArticle', {
					_id: $(event.target).data().id
				}, function(data, textStatus, xhr) {
					if (data.status == 'success') {
						alert("删除成功");
						$("#cancleDelArticle").trigger('click');
						that.init(that.type, that.currentPage);
					} else {
						alert("删除失败");
						$("#cancleDelArticle").trigger('click');
					}
				});
			},	// delete end

		},	// methods end

		components: {
			adminCheckArticleModal
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
	.refresh {
		margin-left: 30px;
		cursor: pointer;
	}
	.audit {
		margin-left: 15px;
		cursor: pointer;	
	}
</style>