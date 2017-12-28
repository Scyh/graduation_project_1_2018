<template>
	<div id="admin_User_Manage">
		<table class="table table-page">
			<thead>
				<tr>
					<td>Page：{{currentPage}}</td>
					<td><input type="text" id="search" placeholder="输入用户名查找" @keyup.enter="searchUser($event)"></td>
				</tr>
				<tr>
					<th>#</th>
					<th>头像</th>
					<th>用户名</th>
					<th title="禁言用户不能发帖、评论、回复">用户权限(1-正常/0-禁言)</th>
					<th>操作 <span title="刷新" class="glyphicon glyphicon-refresh refresh" @click="init(currentPage)"></span></th>
				</tr>
			</thead>
			<tbody>
				<template v-for="(item, index) in user">
					<tr class="user-info" :id="item._id" :data-permission="item.permission">
						<td>{{ index + 1 }}</td>
						<td>
							<img v-if="item.userProfile" :src="item.userProfile" />
				    		<img v-else src="../assets/index.png" />
						</td>
						<td id="username">{{ item.username }}</td>
						<td>{{ item.permission }}</td>
						<td>
							<button class='btn btn-info' data-toggle="modal" data-target="#user_detail_info" @click="transfer($event)">查看</button>
							<button  v-if="item.permission == 1" class="btn btn-warning" @click="forbid($event)">更改权限</button>
							<button v-else class="btn" @click="forbid($event)">恢复权限</button>
							<button class='btn btn-danger' :data-id="item._id" @click="confirm($event)">删除</button>
							
						</td>
					</tr>
				</template>
			</tbody>
		</table>

		<nav v-show="navShow">
			<ul class="pagination">
				<li>
				    <a href="javascript:void(0)"  @click="init(1)" title="首页">
			        <span class="glyphicon glyphicon-backward"></span>
			    	</a>
			    </li>
			    <li>
				    <a href="javascript:void(0)"  @click="change('prev')" title="前一页">
			        <span class="glyphicon glyphicon-chevron-left"></span>
			    	</a>
			    </li>
			    <li>
				    <a href="javascript:void(0)" @click="change('next')" title="后一页">
			        <span class="glyphicon glyphicon-chevron-right"></span>
			      </a>
			    </li>
			    <li>
				    <a href="javascript:void(0)"  @click="init(maxPage)" title="尾页">
			        <span class="glyphicon glyphicon-forward"></span>
			    	</a>
			    </li>
		    </ul>
		</nav>	<!-- 切换分页 end -->

		<div class="modal fade bs-example-modal-sm" tabindex="-1" id="confirmModal">
		    <div class="modal-dialog modal-sm" role="document">
		        <div class="modal-content">
		     		<div class="modal-body">
		     			<p>确认删除？</p>
		     		</div>
		     		<div class="modal-footer">
		     			<button type="button" class="btn btn-default" id="cancleDelUser" data-dismiss="modal">取消</button>
        				<button type="button" class="btn btn-primary" id="confirmDelUser" @click="deleteUser($event)" >确认</button>
		     		</div>
		    	</div>
		    </div>
		</div>	<!-- 确认删除 modal end-->

		<adminCheckUserModal></adminCheckUserModal>
	</div>
</template>
<script>
	import adminCheckUserModal from './admin_check_user_modal.vue'
	import bus from '../bus.js'

	export default {
		data() {
			return {
				user:[],
				checkUserName: '',
				count: 0,
				currentPage: 1,
				navShow: true,
			}
		},
		computed: {
			maxPage() {
				return Math.ceil(this.count / 6)
			},

		},
		mounted() {
			sessionStorage.userPage = 1;
			this.currentPage = 1;
			this.init(this.currentPage);
		},
		methods: {

			init(page) {
				let that = this;
				that.user = [];
				sessionStorage.userPage = page;
				this.currentPage = page;
				that.navShow = true;
				$.get('http://localhost:3000/api/admin/getAllUserInfo', {
					page: page
				}, function(data) {
					data.users.forEach((item, index) => {
						if (item.username == 'admin') {
							return
						} else {
							that.user.push(item);
						}
					})
					that.count = data.count;
				});
			},	// init end

			// 传参
			transfer(event) {
				// console.log($(event.target).parent().siblings("#username").text())
				bus.$emit("transferUserName", $(event.target).parent().siblings("#username").text())
			},	// transfer end

			change(type) {
				if (type == 'prev') {
					if (sessionStorage.userPage > 1) {
						this.currentPage = sessionStorage.userPage --;
						this.init(sessionStorage.userPage);

					}
				} 

				if (type == 'next') {
					if (sessionStorage.userPage < this.maxPage) {
						this.currentPage = sessionStorage.userPage ++;
						this.init(sessionStorage.userPage);		
					}
				}
			},	// change end

			forbid(event) {
				let that = this;
				$.post('http://localhost:3000/api/admin/permission', {
					id: $(event.target).parent().parent().prop('id'),
					permission: $(event.target).parent().parent().data().permission
				}, function(data, textStatus, xhr) {
					if (data.status == 'success') {
						alert("操作成功");
						that.init(that.currentPage)
					} else {
						alert("禁言失败")
					}
				});
			},	// forbid end

			confirm(event) {
				$('#confirmModal').modal('toggle').find("#confirmDelUser").attr('data-id', $(event.target).data().id);
			},	// confirm end
			
			deleteUser(event) {
				let that = this;
				$.post('http://localhost:3000/api/admin/deleteUser', {
					id: $(event.target).data().id
				}, function(data, textStatus, xhr) {
					if (data.status == 'success') {
						alert("删除用户成功");
						$("#cancleDelUser").trigger('click');
						that.init(that.currentPage)
					}
				});
			},	// deleteUser end

			searchUser(event) {
				let that = this;
				if ($(event.target).val() == '') {
					return 
				} else {
					$.post('http://localhost:3000/api/admin/searchUser', {
						username: $(event.target).val().trim()
					}, function(data) {
						console.log(data.length)
						if (data.length > 0) {
							that.user = [];
							that.user = data;
							that.navShow = false;
						} else {
							alert("未搜索到");
							that.navShow = true;
						}
					});
					$(event.target).val("")
				}
			}

				
		},
		components: {
			adminCheckUserModal
		}
	}
</script>
<style scoped>
	.user-info img{
		width: 50px;
		border-radius: 50%;
	}
	.user-info td {
		line-height: 40px;
	}
	.refresh {
		margin-left: 30px;
		cursor: pointer;
	}
	thead tr:first-child {
		display: inline-block;
		padding-bottom: 15px;
		font-size: 18px;
	}
	#search {
		position: absolute;
		border-radius: 5px;
		box-shadow: none;
		font-weight: normal;
	}
	::-webkit-input-placeholder {
    	color: #999;
    	font-size: 14px;
 	}
    :-moz-placeholder {
    	color: #999;
    	font-size: 14px;
    }
  	::-moz-placeholder {
    	color: #999;
    	font-size: 14px;
  	}
  	:-ms-input-placeholder {
    	color: #999;
    	font-size: 14px;
  	}
</style>