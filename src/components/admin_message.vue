<template>
	<div id="admin_Message">
		<table class="table">
			<thead>
				<tr>
					<th># &nbsp; {{ currentPage }} / {{ allPages }}页</th>
					<th>留言人</th>
					<th>留言内容</th>
					<th>留言时间</th>
					<th>留言状态</th>
					<!-- <th>操作</th> -->
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item, index) in msg" :id="item._id">
					<td>
						{{ index + 1 }}
						<input type="checkbox" name="msg">
					</td>
					<td>{{ item.msg_by }}</td>
					<td>{{ item.msg_content }}</td>
					<td>{{ item.msg_date | getDate }}</td>
					<td :status="item.msg_status">{{ item.msg_status | switchMsgStatusType }}</td>
					<!-- <td>

						<button class="btn btn-danger">删除</button>
					</td> -->
				</tr>
			</tbody>
		</table>
		<nav aria-label="Page navigation">
		  	<ul class="pagination">
		   		<li>
		      		<a @click="changePage('prev')" href="javascript:void(0)" aria-label="Previous">
		        		<span aria-hidden="true">&laquo;</span>
		      		</a>
		    	</li>
		    	<li>
		      		<a @click="changePage('next')" href="javascript:void(0)" aria-label="Next">
		        		<span aria-hidden="true">&raquo;</span>
		      		</a>
		    	</li>
		  	</ul>
		</nav>
		<ul class="select">
			<li>选择：</li>
			<li @click="selectMsg('all')">全部</li>
			<li @click="selectMsg('none')">无</li>
			<li @click="selectMsg('hasRead')">已读</li>
			<li @click="selectMsg('notRead')">未读</li>
		</ul>
		<ul class="operation">
			<li>操作：</li>
			<li @click="operateMsg('selected', 'status')">标记为已读</li>
			<li @click="operateMsg('all', 'status')">全部标记为已读</li>
			<li @click="operateMsg('selected', 'del')">删除</li>
			<li @click="operateMsg('all', 'del')">全部删除</li>
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
				notReadMsgLength: 0,
				itemShow: 8,
				allPages: 0
			}
		},
		mounted () {
			this.init(this.currentPage, this.itemShow)
		},
		methods: {
			init(page, itemShow) {
				let that = this;
				that.msg = [];
				$.get('http://localhost:3000/api/getMsg', {
					page: page,
					itemShow: itemShow
				}, function(data, textStatus, xhr) {
					if (data.status == 'success') {
						for(let i in data.msg) {
							that.msg.push(data.msg[i]);
						}
						that.allPages = data.allPages;
					}
				});
			},	// init end

			// 选择留言
			selectMsg(type) {
				switch(type) {
					case 'all':
						$("tbody tr").removeClass('selected').find("input[name='msg']").prop('checked',true).parent().parent().addClass('selected');
						break;
					case 'none':
						$("tbody tr").removeClass('selected').find("input[name='msg']").prop('checked',false);
						break;
					case 'hasRead':
						$("tbody tr").removeClass('selected').find("input[name='msg']").prop('checked',false).end().find("[status='hasRead']").parent().addClass('selected').find("input[name='msg']").prop('checked', true);
						break;
					case 'notRead':
						$("tbody tr").removeClass('selected').find("input[name='msg']").prop('checked',false).end().find("[status='notRead']").parent().addClass('selected').find("input[name='msg']").prop('checked', true);
						// $("[status='notRead']").parent().find("input[name='msg']").prop('checked', true);
				}
			},	// selectMsg end

			// 对留言进行操作
			operateMsg(selectType, operationType) {
				let msg_id_arr = [];
				if (selectType == 'selected') {
					let $msgSelected = $("input[name='msg']:checked")
					if ($msgSelected.length == 0) {
						alert("未选中邮件")
					} else {
						for(let i=0; i<$msgSelected.length; i++) {
							msg_id_arr.push($($msgSelected[i]).parent().parent().attr('id'));
						}
						if (operationType == 'status') {
							this.operateMsgStatusFn(msg_id_arr);
						} else if (operationType == 'del') {
							this.delMsgFn(msg_id_arr);
						}
					}

				} else if (selectType == 'all') {
					let $msgAll = $("tbody > tr");
					for(let i=0; i<$msgAll.length; i++) {
						msg_id_arr.push($($msgAll[i]).attr('id'))
					}
					// console.log(msg_id_arr)
					if (operationType == 'status') {
							this.operateMsgStatusFn(msg_id_arr);
						} else if (operationType == 'del') {
							this.delMsgFn(msg_id_arr);
						}
					
				}
			},	// operateMsgStatus end

			operateMsgStatusFn(msgArr) {
				let that = this;
				// console.log(JSON.stringify(msgArr))
				$.post('http://localhost:3000/api/admin/operateMsgStatus', {
					msgArr: JSON.stringify(msgArr)
				}, function(data, textStatus, xhr) {
				 	if (data.status == 'success') {
				 		alert("操作成功");
				 		that.init(that.currentPage, that.itemShow);
				 	} else {
				 		alert("操作失败");
				 		that.init(that.currentPage, that.itemShow);
				 	}
				});
			},	// operateMsgStatusFn end

			// 删除留言
			delMsgFn(msgArr) {
				let that = this;
				$.post('http://localhost:3000/api/admin/delMsg', {
					msgArr: JSON.stringify(msgArr)
				}, function(data, textStatus, xhr) {
						if (data.status == 'success') {
							alert("删除成功");
							that.init(that.currentPage, that.itemShow);
						} else {
							alert("删除失败");
							that.init(that.currentPage, that.itemShow);
						}
					});
				},	// delMsgFn end

			// 分页换页
			changePage(type) {
				switch(type) {
					case 'prev':
						if (this.currentPage < 2) {
							return
						} else {
							this.currentPage--;
							this.init(this.currentPage, this.itemShow);
						}
						break;
					case 'next':
						if (this.currentPage > (this.allPages -1)) {
							return
						} else {
							this.currentPage++;
							this.init(this.currentPage, this.itemShow);
						}
						break;
					default:
						return
				}
			}
		},	// methods end
	}
</script>
<style scoped>
	ul.select li,
	ul.operation li {
		list-style: none;
		display: inline-block;
		cursor: pointer;
		margin-right: 5px;
	}
	.selected {
		background-color: #528BCB;
	}
	.select li:not(:first-child):not(:last-child)::after {
		content: '-';
		display: inline-block;
		position: relative;
		left: 4px;
		font-size: 18px;

	}
</style>