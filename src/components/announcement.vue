<template>
	<div class="announcement">
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<article>
						<div class="announcement_title">
							<h2>{{ announcement.announcement_title }}</h2>
						</div>
						<div class="announcement_meta">
							<span>{{ announcement.announcement_author }}</span>
							<span>{{ announcement.announcement_date | getDate}}</span>
						</div>
						<div class="announcement_content">
							<p>
								{{ announcement.announcement_content }}
							</p>
						</div>
					</article>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				announcement: {}
			}
		},
		mounted() {
			this.init(this.$route.query.id)
		},
		methods: {
			init(id) {
				let that = this;
				$.get('http://localhost:3000/api/initAnnouncement', {
					id: id
				}, function(data) {

					if (data.status == 'fail') {
						alert("初始化失败")
					} else {
						that.announcement = data
					}				
				});
			},
		},
	}
</script>
<style scoped>
	.announcement_title {
		text-align: center;
	}
	.announcement_meta {
		padding: 15px;
		color: #999;
		font-size: 13px;
		text-align: center;
	}
	.announcement_content {
		min-height: 400px;
		font-size: 18px;
	}
</style>