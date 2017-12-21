<template>
	<div id="myNotice">
		<ul v-if="hasNotice">
			<li class="notice-operation">
				<span>未读通知&nbsp;{{ notReadCount }}</span>
				<a href="javascript:void(0)" @click="allRead">全部标记为已读</a>
				<span data-toggle="modal" data-target="#confirmClear">
					<a href="javascript:void(0)">清空所有通知</a>
				</span>
			</li>
			<template v-for="item in notice">
				<li :class="item.notice_state=='notRead'?'notRead':''">
					<router-link :to="'/'+item.notice_ByUser">
						{{ item.notice_ByUser }}
					</router-link>
					{{item.notice_type | switchNoticeType}}
					<router-link :to="'/' + notice_user + '/articles/' + item.notice_title_id">
						{{item.notice_title}}
					</router-link>
				</li>
			</template>
		</ul>

		<p v-else class="hasNoNotice">
			<span class="glyphicon glyphicon-th"></span>暂时没有通知哦！
		</p>
		<div class="modal fade bs-example-modal-sm" id="confirmClear" tabindex="-1"  aria-labelledby="mySmallModalLabel">
		  <div class="modal-dialog modal-sm" role="document">
		    <div class="modal-content">
		    	
		      <div class="modal-body">
		      	<p>确认全部清空？</p>
		      </div>
		      <div class="modal-footer">
		    	<button type="button" class="btn btn-default cancle"  data-dismiss="modal">取消</button>
        		<button type="button" class="btn btn-primary" @click="clearAllNotice">确认</button>
		    </div>
		    </div>
		    
		  </div>
		</div>

	</div>
</template>
<script>
	export default {
		data() {
			return {
				notice:[],
				notice_user: '',
				notReadCount: '',
				_id: '',
			}
		},
		props: {
			userName: {
				type: String,
				required: true
			}
		},
		computed: {
			hasNotice: function () {
				return this.notice.length>0?true:false
			},
		},
		mounted: function () {
			this.initMyNotice();
		},
		methods: {
			// 初始化个人通知tab
			initMyNotice: function () {
				let that = this;
				that.notice = [];
				$.get('http://localhost:3000/api/getMyNotice', {
					user: that.userName
				}, function(data) {

					console.log(data);
					console.log(data.length)
					if (data.length > 0) {
						let notReadCount = 0;
						that.notice_user = data[0].notice_user;
						data[0].notice.forEach(item => {
							that.notice.push(item)
							if (item.notice_state == 'notRead') {
								notReadCount++;
							}
						})
						that.$emit("initTabHeaderbadge",notReadCount);
						that.notReadCount = notReadCount;
						that._id = data[0]._id;
					} else {
						that.notice_user = sessionStorage.username;
						that.notReadCount = 0;
					}
				});
			},

			// 全部标记为已读
			allRead: function () {
				let that = this;
				$.post('http://localhost:3000/api/noticeAllRead', {
					_id: that._id
				}, function(data, textStatus, xhr) {
					if (data.status == 'success') {
						that.initMyNotice();
						console.log('success')
					} else {
						alert("标记失败")
					}
				});
			},

			clearAllNotice: function () {
				let that = this;
				$.post('http://localhost:3000/api/clearAllNotice', {
					_id: that._id
				}, function(data, textStatus, xhr) {
					if (data.status == 'success') {

						// 加载动画
						setTimeout(() => {
							that.initMyNotice();
							$(".cancle").trigger('click');
						}, 200)
					}
				});
			}
		},
	}
</script>
<style scoped>
	ul {
		padding-left: 0;
		list-style: none;
	}
	li:not(:first-child) {
		padding: 15px 0 15px 12px;
	}
	.notRead::before{
		content: '';
		display: inline-block;
		position: absolute;
		margin-top: 6px;
		margin-left: -12px;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background-color: #FEA505;
	}
	.notice-operation {
		padding: 15px 0 20px;
	}
	.notice-operation span,
	.notice-operation a {
		margin-right: 15px;
	}
	a,
	a:hover,
	a:visited,
	a:link {
		text-decoration: none;
	}
	#confirmClear .modal-body {
		font-size: 20px;
		padding: 30px;
	}
	.hasNoNotice {
		position: absolute;
		top: 0;
	    left: 0;
	    right: 0;
	    bottom: 0;
	    transform: translate(50%,50%);
	    font-size: 18px;
	}
	.hasNoNotice span {
		margin-right: 10px;
	}
</style>