<template>
	<div id="admin_Message">
		<table class="table">
			<thead>
				<tr>
					<th>#</th>
					<th>留言人</th>
					<th>留言内容</th>
					<th>留言时间</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item, index) in msg">
					<td>{{ index + 1 }}</td>
					<td>{{ item.msg_by }}</td>
					<td>{{ item.msg_content }}</td>
					<td>{{ item.msg_date | getDate }}</td>
					<td>
						<button class="btn btn-danger">删除</button>
					</td>
				</tr>
			</tbody>
		</table>
		<nav aria-label="Page navigation">
		  	<ul class="pagination">
		   		<li>
		      		<a href="#" aria-label="Previous">
		        		<span aria-hidden="true">&laquo;</span>
		      		</a>
		    	</li>
		    	<li>
		      		<a href="#" aria-label="Next">
		        		<span aria-hidden="true">&raquo;</span>
		      		</a>
		    	</li>
		  	</ul>
		</nav>
		<ul>
			<li>标记为已读 {{notReadMsgLength}}</li>
			<li>全部标记为已读</li>
			<li>全部删除</li>
		</ul>
	</div>
</template>
<script>
	import bus from '../bus.js'

	export default {
		data () {
			return {
				msg: [],
				currentPage: 1,
				notReadMsgLength: 0
			}
		},
		mounted () {
			this.init(this.currentPage)
		},
		methods: {
			init(page) {
				let that = this;
				that.msg = [];
				$.get('http://localhost:3000/api/getMsg', {
					page: page
				}, function(data, textStatus, xhr) {
					if (data.status == 'success') {
						for(let i in data.msg) {
							that.msg.push(data.msg[i]);
						}
					}
				});
			}
		}
	}
</script>
<style scoped>
	
</style>