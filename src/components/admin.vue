<template>
	<div id="admin">
		<div class="row">
					<div class="menu-header col-md-12">
						<div>
							<div>
								基于B/S架构的web前端学习网站
							</div>
						</div>
					</div>
				</div>
		<div class="row menu">
			<div class="col-md-2 menu-left">
				<dl>
					<dt @click="fn($event)" title="userManage" id="userManage"><span class="glyphicon glyphicon-user"></span>用户管理</dt>
				</dl>
				<dl>
					<dt @click="fn($event),articleFilter('all', $event)" title="articleManage" id="articleManage"><span class="glyphicon glyphicon-list"></span>文章管理</dt>
					<dd @click="fn($event),articleFilter('audited', $event)" title="articleManage">已审核</dd>
					<dd @click="fn($event),articleFilter('notAudit', $event)" title="articleManage">待审核</dd>
				</dl>
				<dl>
					<dt @click="fn($event),announcementPublish('manage', $event)" title="announcement" id="announcement"><span class="glyphicon glyphicon-bullhorn"></span>公告管理</dt>
					<!-- <dd @click="fn($event),announcement('')">公告管理</dd> -->
					<dd @click="fn($event),announcementPublish('publish', $event)" title="announcement">发布公告</dd>
				</dl>
				<dl>
					<dt @click="fn($event)" title="message" id="message"><span class="glyphicon glyphicon-tags"></span>留言</dt>
				</dl>
				<dl>
					<dt @click="fn($event)" title="tipOff" id="tipOff"><span class=" glyphicon glyphicon-info-sign"></span>举报</dt>
				</dl>
			</div>
			<div class="col-md-10 menu-right">
				<div class="menu-right-top">
					{{ currentPath }}
				</div>
				<div class="menu-right-body">
					<admin-user-info v-if="currentContent == 'userManage' "></admin-user-info>
					<admin-article v-if="currentContent == 'articleManage' "></admin-article>
					<admin-announcement v-if="currentContent == 'announcement' "></admin-announcement>
					<admin-message v-if="currentContent == 'message' "></admin-message>
					<admin-tip-off v-if="currentContent == 'tipOff' "></admin-tip-off>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import adminUserInfo from './admin_User_Manage.vue'
	import adminArticle from './admin_Article_Manage.vue'
	import adminAnnouncement from './admin_announcement.vue'
	import adminMessage from './admin_message.vue'
	import adminTipOff from './admin_tipOff.vue'
	import bus from '../bus.js'

	export default {
		data() {
			return {
				currentPath: '首页',
				currentContent: '',
			}
		},
		beforeCreate() {
			// console.log('sessionStorage.admin: ' + sessionStorage.admin)
			if (sessionStorage.admin !== 'admin') {
				// console.log('当前不是管理员登录');
				alert("管理员已退出或当前不是管理员登录")
				this.$router.replace('/')
			}
		},
		mounted() {
			bus.$on('publishSuccess', () => {
				// console.log("触发")
				$("#announcement").trigger("click");
			})
		},
		methods: {

			// 添加选中样式
			fn(event) {
				let targetType = event.target.nodeName.toLowerCase();
				if (targetType == 'dt') {
					$(event.target).addClass('activeDT').siblings().slideDown().removeClass('activeDt activeDD1 activeDD2').end().parent().siblings().find('dt').removeClass('activeDT').end().find('dd').removeClass('acticeDD1 activeDD2').slideUp()
					this.currentPath = $(event.target).text()
				} else if (targetType == 'dd') {
					$(event.target).addClass('activeDD' + $(event.target).index()).siblings().removeClass('activeDD1 activeDD2 activeDT').parent().siblings().children().removeClass('activeDT');
					this.currentPath = $(event.target).prevAll('dt').text() + ' / ' + $(event.target).text();
				} else { return false }
					this.currentContent = $(event.target).attr('title');
				},

			// 筛选文章
			articleFilter(data, event) {
				console.log(this.currentContent)
				
				bus.$emit('type', data)
			},

			// 公告操作
			announcementPublish(data) {
				bus.$emit('announcement', data)
			},	

		},
		components: {
			adminUserInfo,
			adminArticle,
			adminAnnouncement,
			adminMessage,
			adminTipOff
		}

	}
</script>
<style scoped>
	.row {
		margin: 0 !important;
	}
	#admin {
		/*width: 100%;*/
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
	.menu {
		height: calc(100% - 88px);
	}
	.menu-header {
		padding: 30px;
		background-color: #438EB9;
		color: #FFF;
		font-size: 18px;
	}
	.menu-left {
		height: 100%;
		padding: 0;
		background-color: #F2F2F2;
		border-right: 1px solid #CCC;
		/*color: #6E8096;*/
	}
	.menu-right {
		height: 100%;
		padding: 0;
		background-color: #F2F2F2;
	}
	dl {
		position: relative;
		margin-bottom: 0;
		box-sizing: border-box;
		padding: 20px 0 20px 60px;
		border-bottom: 1px dashed #CCC;
		background-color: #FFF;
	}
	dl dt{
		font-weight: normal;
		cursor: pointer;
	}
	dt span {
		margin-right: 10px;
	}
	dl dd {
		display: none;
		margin-left: 30px;
		padding: 10px;
		cursor: pointer;
	}
	.menu-right-top {
		padding: 15px 0 15px 15px;
		border-bottom: 1px solid #CCC;
		font-size: 17px;
		color: #999;
	}
	.menu-right-body {
		padding: 15px;
		min-height: 600px;
		background-color: #FFF;
	}
	.activeDT::after,
	.activeDD1::after,
	.activeDD2::after {
		content: '';
		position: absolute;
		top: 16px;
		right: 0;
		display: inline-block;
		
	    border-right: 15px solid #41B886;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
	}
	.activeDD1::after {
		top: 50px;
	}
	.activeDD2::after {
		top: 90px;
	}
</style>