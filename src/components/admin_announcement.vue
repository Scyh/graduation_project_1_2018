<template>
	<div id="admin_Announcement">
		<template v-if="!isPublish">
			<table class="table" >
				<thead>
					<tr>
						<th>#</th>
						<th>标题</th>
						<th>发布时间</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, index) in announcements" :id="item._id">
						<td>{{ index + 1 }}</td>
						<td>{{ item.announcement_title }}</td>
						<td>{{ item.announcement_date | getDate }}</td>
						<td>
							<button class="btn btn-info" data-toggle="modal" data-target="#announcementDetail" @click="transferAnnouncement($event)">查看</button>
							<button class="btn btn-danger" data-toggle="modal" data-target="#confirmDelAnnModal" @click="transfer($event)">删除</button>
						</td>
					</tr>
				</tbody>
			</table>			
		</template>

		<cus-publish v-else></cus-publish>
		<admin-check-announcement-modal></admin-check-announcement-modal>

		<div class="modal fade bs-example-modal-sm" id="confirmDelAnnModal" tabindex="-1">
		  	<div class="modal-dialog modal-sm">
		    	<div class="modal-content">
		    		<div class="modal-header">
		      			<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					</div>
					<div class="modal-body">
						<p>确认删除？</p>
					</div>
					<div class="modal-footer">
		    	  			<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
		    			<button type="button" class="btn btn-primary" id="confirmDel" @click="deleteOne($event)">确认</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	
</template>
<script>
	import bus from '../bus.js'
	import cusPublish from './admin_publish_announcement.vue'
	import adminCheckAnnouncementModal from './admin_check_announcement_modal.vue'

	export default {
		data () {
			return {
				announcements: [],
				isPublish: false
			}
		},
		mounted() {
			this.init()
			bus.$on('announcement', data => {
				if (data == 'manage') {
					this.isPublish = false
					this.init();
				} else if (data == 'publish') {
					this.isPublish = true
				}
			})
		},
		methods: {
			init() {
				let that = this;
				$.get('http://localhost:3000/api/admin/getAnnouncements', function(data) {
					that.announcements = [];
					data.forEach(item => {
						that.announcements.push(item);
					})
				});
			},	// init end

			// 传送 _id 给 admin_check_announcement_modal 
			transferAnnouncement(event) {
				let id = $(event.target).parent().parent().attr('id')
				if (id) {
					bus.$emit("transferAnnouncementId", id)	
				}
			},	// transferAnnouncement end

			// 传送 _id 给 确认modal
			transfer(event) {
				let id = $(event.target).parent().parent().attr('id');
				if (id) {
					$("#confirmDel").attr('id', id);
				}
			},	// transfer end

			// 确认删除
			deleteOne(event) {
				// console.log($(event.target).attr('id'))
				let that = this;
				$.post('http://localhost:3000/api/admin/delAnnouncement', {
					id: $(event.target).attr('id')
				}, function(data, textStatus, xhr) {
					console.log(data.status)
					if (data.status == 'success') {
						$("#confirmDelAnnModal .close").trigger('click');
						that.init();
					} else {
						alert("删除出错")
					}
				});
			},	// deleteOne end
		},
		destroyed() {
			// this.isPublish = false;
			console.log('destroyed')
			bus.$off('announcement')
		},
		components: {
			cusPublish,
			adminCheckAnnouncementModal
		}
	}
</script>
<style scoped>
	
</style>