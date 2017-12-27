<template>
	<div id="admin_User_Manage">
		<table class="table table-page">
			<thead>
				<tr>Page：{{currentPage}}</tr>
				<tr>
					<th>#</th>
					<th>头像</th>
					<th>用户名</th>
					<th>操作 <span class="glyphicon glyphicon-refresh refresh" @click="init(currentPage)"></span></th>
				</tr>
			</thead>
			<tbody>
				<template v-for="(item, index) in user">
					<tr class="user-info">
						<td>{{ index + 1 }}</td>
						<td>
							<img v-if="item.userProfile" :src="item.userProfile" />
				    		<img v-else src="../assets/index.png" />
						</td>
						<td id="username">{{ item.username }}</td>
						<td>
							<button class='btn' data-toggle="modal" data-target="#user_detail_info" @click="transfer($event)">查看</button>
							<button class='btn'>删除</button>
						</td>
					</tr>
				</template>
			</tbody>
		</table>
		
		<nav aria-label="Page navigation">
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
		</nav>


		<adminCheckUserModal></adminCheckUserModal>
	</div>
</template>
<script>
	import adminCheckUserModal from './admin_check_user_modal.vue'
	import bus from '../bus.js'

	export default {
		data () {
			return {
				user:[],
				checkUserName: '',
				count: 0,
				currentPage: 1,
			}
		},
		computed: {
			maxPage () {
				return Math.ceil(this.count / 6)
			},
		},
		mounted () {
			// console.log(this.currentPage.slice(5))
			this.init(this.currentPage);
			sessionStorage.userPage = 1;
		},
		methods: {
			init (page) {
				let that = this;
				that.user = [];
				sessionStorage.userPage = page
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
					that.count = data.count
				});
			},

			transfer (event) {
				// console.log($(event.target).parent().siblings("#username").text())
				bus.$emit("transferUserName", $(event.target).parent().siblings("#username").text())
			},

			change (type) {
				console.log("maxPage: " + this.maxPage )
				if (type == 'prev') {
					console.log('prev')
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


			},

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
</style>