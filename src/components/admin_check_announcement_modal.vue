<template>
	<div class="announcement-detail">
		<div class="modal fade" id="announcementDetail" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		  <div class="modal-dialog" role="document">
		    <div class="modal-content">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		        <h4 class="modal-title">
		        	{{ announcement.announcement_title }}
		        </h4>
		        <div class="announcement_meta">
		        	<span>
		        		{{ announcement.announcement_date | getDate }}
		        	</span>
		        	<span>
		        		{{ announcement.announcement_author }}
		        	</span>
		        </div>
		      </div>
		      <div class="modal-body">
		        <p>{{ announcement.announcement_content }}</p>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-primary" data-dismiss="modal">关闭</button>
		        <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
		      </div>
		    </div>
		  </div>
		</div>
	</div>
</template>
<script>
	import bus from '../bus.js'
	export default {
		data() {
			return {
				announcement: {}
			}
		},
		mounted() {
			bus.$on('transferAnnouncementId', data => {
				if (data) {
					let that = this;
					$.get('http://localhost:3000/api/admin/getOneAnnouncement', {
						id: data
					}, function(data) {
						that.announcement = data
					});
				}
			})
		},
		methods: {
			init(id) {

			}
		}
	}
</script>
<style scoped>
	.modal-header {
		padding-bottom: 0;
	}
	.modal-title {
		text-align: center;
	}
	.announcement_meta {
		font-size: 12px;
		color: #999;
		text-align: center;
		padding: 10px 0;
	}
	.modal-body {
		min-height: 200px;
		text-indent: 32px;
	}
</style>
