<template>
	<div>
		<div class="modal fade" id="user_detail_info" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
		    <div class="modal-dialog" role="document">
			    <div class="modal-content">
			        <div class="modal-header">
			        	<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			        	<h4 class="modal-title" >用户个人信息</h4>
			        </div>
				    <div class="modal-body">
				    	<div class="userProfile">
				    		<img v-if="userDetailInfo.userProfile" :src="userDetailInfo.userProfile" />
				    		<img v-else src="../assets/index.png" />
				    	</div>
						
						<div class="row">
			        		<div class="col-md-offset-1 col-md-8 info-title">
			        			<div class="row">
			        				<div class="col-md-4 title-Chinese">
			        					<span>基本信息</span>
			        				</div>
			        				<div class="col-md-8 title-English">
			        					<span>Basic Information</span>		
			        				</div>
			        			</div>
			        		</div>
			        	</div>

			        	<div class="row info">
			        		<div class="col-md-offset-1 col-md-4">
			        			<span>用户名：{{ userDetailInfo.username }}</span>
			        		</div>
			        		<div class="col-md-offset-1 col-md-4">
			        			<span>真实姓名：{{ userDetailInfo.trueName }}</span>
			        		</div>
			        		<br />
			        		<br />
			        		<div class="col-md-offset-1 col-md-4">
			        			<span>性别：{{ userDetailInfo.sex }}</span>
			        		</div>
			        		<div class="col-md-offset-1 col-md-4">
			        			<span>生日：{{ userDetailInfo.birthday }}</span>
			        		</div>
			        	</div>
			        	
			        	<div class="row">
			        		<div class="col-md-offset-1 col-md-10 info-title">
			        			<div class="row">
			        				<div class="col-md-offset-1 col-md-4 title-Chinese">
			        					<span>行业工作</span>
			        				</div>
			        				<div class="col-md-offset-1 col-md-8 title-English">
			        					<span>Industry Work</span>		
			        				</div>
			        			</div>
			        		</div>
			        	</div>

			        	<div class="row info">
			        		<div class="col-md-offset-1 col-md-4">
			        			<span>行业：{{ userDetailInfo.industry }}</span>
			        		</div>
			        		<div class="col-md-offset-1 col-md-4">
			        			<span>职业：{{ userDetailInfo.job }}</span>
			        		</div>
			        	</div>

						<div class="row">
			        		<div class="col-md-offset-1 col-md-10 info-title">
			        			<div class="row">
			        				<div class="col-md-offset-1 col-md-4 title-Chinese">
			        					<span>自我介绍</span>
			        				</div>
			        				<div class="col-md-offset-1 col-md-8 title-English">
			        					<span>Self Introduce</span>		
			        				</div>
			        			</div>
			        		</div>
			        	</div>

						<div class="row info">
			        		<div class="col-md-offset-1 col-md-12">
			        			<span>自我介绍：{{ userDetailInfo.introduce }}</span>
			        		</div>
			        	</div>

						<div class="row">
			        		<div class="col-md-offset-1 col-md-10 info-title">
			        			<div class="row">
			        				<div class="col-md-offset-1 col-md-4 title-Chinese">
			        					<span>设置权限</span>
			        				</div>
			        				<div class="col-md-offset-1 col-md-8 title-English">
			        					<span>Set Permissions</span>		
			        				</div>
			        			</div>
			        		</div>
			        	</div>
						<div class="row info">
			        		<div class="col-md-offset-1 col-md-12">
			        			<span>权限：{{ userDetailInfo.permission }}</span>
			        		</div>
			        	</div>

			      	</div>
			      	<div class="modal-footer">
			        	<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
			        	<button type="button" class="btn btn-primary">确认修改</button>
			      	</div>
		    	</div>
		    </div>
		</div>
	</div>
</template>
<script>
	import bus from '../bus.js'

	export default {
		data () {
			return {
				userDetailInfo: {}
			}
		},
		mounted () {
			bus.$on('transferUserName', data => {
				if (data == undefined || data == '' || data == null) {
					return 
				} else {
					this.init(data);

				}
			})
			
		},
		methods: {
			init (username) {
				let  that = this;
				$.get('http://localhost:3000/api/getUserInfo', {
					username: username
				}, function(data) {
					for (let i in data) {
						that.userDetailInfo[i] = data[i];
					}
					that.userDetailInfo = that.userDetailInfo[0];
				});
			}
		}
	}
</script>
<style scoped>
	.modal-body {
		min-height: 100px;
		color: #999;
	}
	.userProfile {
		position: absolute;
		top: 40px;
    	right: 50px;
	}
	.userProfile img{
		width: 85px;
	}
	.info-title {
		padding: 15px;
		color: #FFF;
		text-indent: 10px;
		/*background: #7CC49C;
	    background-clip: content-box;*/
		/*border-bottom: 1px solid #CCC;*/
	}
	.row .info-title span {
		font-size: 18px !important;
	}
	.title-Chinese {
		margin-left: 15px;
		
		background-color: #7CC49C;
	}
	.title-English {
		margin-left: -15px;
		color: #CCC;
		background-color: #D9EDE1;
	}
	.info-title::before {
		content: '';
		position: absolute;
		display: inline-block;
		width: 5px;
		height: 23px;
		left: 5px;
		background-color: #41B886;
	}
	.row span {
		font-size: 14px;
	}
	.info {
		padding: 15px;
	}
</style>