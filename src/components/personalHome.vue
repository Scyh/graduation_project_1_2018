<template>
	<div class="home">
		<div class="container">
			<div class="row home-header">
				<div class="col-sm-2 col-md-2 col-lg-2">
					<div class="img-wrap">
						<div class="userProfile-wrap">
							<img :src="userInfo.userProfile" id="userProfile">	
						</div>
						<span class="edit_photo" data-toggle="modal" data-target="#chooseModal">
							<img src="../assets/edit_photo.png">
						</span>
					</div>							
				</div>
				<div class="col-sm-10 col-md-10 col-lg-10 userinfo" tabindex="1">
					<span class="glyphicon glyphicon-edit edit-userInfo" data-target="#editUserInfo" data-toggle="modal"></span>
					<dl>
						<dt>{{ userInfo.username }}</dt>
						<dd>
							<template v-if="!userInfo.industry">
								<span class="info-null">未填写行业</span>
							</template>
							<template v-else>
								<span>{{ userInfo.industry }}</span>
							</template>
							<span>|</span>
							<template v-if="!userInfo.job">
								<span class="info-null">未填写行业</span>
							</template>
							<template v-else>
								<span>{{ userInfo.job }}</span>
							</template>
							<span>|</span>
							<template v-if="!userInfo.trueName">
								<span class="info-null">未填写真实姓名</span>
							</template>
							<template v-else>
								<span>{{ userInfo.trueName }}</span>
							</template>
							<span>|</span>
							<template v-if="!userInfo.birthday">
								<span class="info-null">未填写生日</span>
							</template>
							<template v-else>
								<span>{{ userInfo.birthday }}</span>
							</template>
							<span>|</span>
							<template v-if="!userInfo.sex">
								<span class="info-null">未填写性别</span>
							</template>
							<template v-else>
								<span>{{ userInfo.sex }}</span>
							</template>
						</dd>
						<dt>
							<template v-if="!userInfo.introduce">
								<span class="info-null">未填写个人简介</span>
							</template>
							<template v-else>
								<span>{{ userInfo.introduce }}</span>
							</template>
						</dt>
					</dl>
				</div>
			</div>

			<div class="row home-tab">
				<div class="col-md-12">
					<div>
					  <!-- Nav tabs -->
						<div class="row">
							<ul class="nav nav-tabs" role="tablist">
							    <li role="presentation" class="active col-md-3"><a href="#myArticles" aria-controls="home" role="tab" data-toggle="tab">我的文章</a></li>
							    <li role="presentation" class="col-md-3"><a href="#myQuestions" aria-controls="profile" role="tab" data-toggle="tab">我的提问</a></li>
							    <li role="presentation" class="col-md-3"><a href="#myMessage" aria-controls="messages" role="tab" data-toggle="tab">我的通知<span class="badge badge-wraning">2</span></a></li>
							    <li role="presentation" class="col-md-3"><a href="#myRelation" aria-controls="settings" role="tab" data-toggle="tab">我的关系</a></li>
						    </ul>

						</div>
					  <!-- Tab panes -->
					    <div class="tab-content">
						    <div role="tabpanel" class="tab-pane active" id="myArticles">
								<myArticles :userName="currentUserName"></myArticles>
							</div>
						    <div role="tabpanel" class="tab-pane" id="myQuestions">这里是我的提问</div>
						    <div role="tabpanel" class="tab-pane" id="myMessage">这里是我的通知</div>
						    <div role="tabpanel" class="tab-pane" id="myRelation">这里是我的关系</div>
					    </div>
					</div>
				</div>
			</div>
		</div>

	<!-- 选择头像模态框 -->
	<div class="modal fade" tabindex="-1" role="dialog" id="chooseModal">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal"></button>
	        <label for="file" class="file-label">请选择头像<input type="file" id="file" @change="preview"></label>
	      </div>
	      <div class="modal-body">
	        <div class="tempImg-wrap">
	            <div class="row">
	            	<div class="col-md-4">
	            		<img src="../assets/index.png" id="tempImgLG">
	            	</div>
			        <div class="col-md-2 col-md-offset-1">
			            <div>
			                <div class="imgPreview">
			                </div>
			            </div>
			        </div>
			        <div class="col-md-2 col-md-offset-2">
			            <div>
			                <div class="imgPreview imgPreviewRound">
			                </div>
			            </div>
			        </div>
	      		</div>
	        </div>
	      	</div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
	        <button type="button" class="btn btn-primary" @click="crop">保存</button>
	      </div>
	    </div><!-- /.modal-content -->
	  </div><!-- /.modal-dialog -->
	</div><!-- modal 结束-->

	<!-- 修改用户信息模态框 -->
	<div class="modal fade" tabindex="-1" role="dialog" id="editUserInfo">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title">编辑个人信息</h4>
	      </div>
	      <div class="modal-body">
	        <form class="form-horizontal">
	          <label class="col-sm-12 username-noEdit">用户名：{{ userInfo.username }}</label>
			  <div class="form-group">
			    <label for="trueName" class="col-sm-1 control-label">实名</label>
			    <div class="col-sm-4">
			      <input type="text" class="form-control" id="trueName" :value="userInfo.trueName?userInfo.trueName:''">
			    </div>
			    <label for="sex" class="col-sm-offset-1 col-sm-1 control-label">性别</label>
			    <div class="col-sm-4">
			      <label class="radio-inline" for="male">
			      	<input type="radio" name="sex" id="male" value="男" :checked="userInfo.sex=='男'?true:false">男
			      </label>
			      <label class="radio-inline" for="female">
			      	<input type="radio" name="sex" id="female" value="女" :checked="userInfo.sex=='女'?true:false">女
			      </label>
			    </div>   
			  </div>
			  <div class="form-group">
			    <label for="industry" class="col-sm-1 control-label">行业</label>
			    <div class="col-sm-4">
			      <select id="industry" class="form-control">
			      	<option v-for="item in industryArr" :value="item" class="form-control" :checked="userInfo.industry==item?true:false">{{ item }}</option>
			      </select>
			    </div>
			    <label for="job" class="col-sm-offset-1 col-sm-1 control-label">职业</label>
			    <div class="col-sm-4">
			      <input type="text" class="form-control" id="job" :value="userInfo.job?userInfo.job:''">
			    </div>   
			  </div>

			  <div class="form-group">
			    <label for="birthday" class="col-sm-1 control-label">生日</label>
			    <div class="col-sm-4">
			      <input type="text" id="birthday" class="form-control" :value="userInfo.birthday?userInfo.birthday:''">
			    </div>
			  </div>

			  <div class="form-group">
			    <label for="introduce" class="col-sm-1 control-label">简介</label>
			    <div class="col-sm-10">
			      <textarea id="introduce" class="form-control" style="resize: none;height: 100px;" placeholder="请输入你的个人简介" :value="userInfo.introduce?userInfo.introduce:''"></textarea>
			    </div>
			  </div>
			  
			</form>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
	        <button type="button" class="btn btn-primary" @click="saveUserInfo">保存</button>
	      </div>
	    </div><!-- /.modal-content -->
	  </div><!-- /.modal-dialog -->
	</div><!-- /.modal -->

	</div>
</template>
<script>
	import cropper from 'cropper'
	import myArticles from '../components/myArticles.vue'

	export default {
		data: function () {
			return {
				userInfo: {},
				industryArr: ['选择行业','电子·微电子','通信','教育·培训·科研·院校','医疗·保健·美容·卫生服务','银行','保险','IT服务·系统集成','基金·证券·期货·投资','政府·非营利机构','房地产服务','交通·运输·物流','广告·会展·公关','房地产开发·建筑与工程','娱乐·运动·休闲','快速消费品','家电业','仪器·仪表·工业自动化·电气','计算机软件','计算机硬件·网络设备','汽车·摩托车','互联网·电子商务','其他'],
			}
		},
		computed: {
			currentUserName: function () {
				return sessionStorage.username
			}
		},
		beforeCreate: function () {
			let temp = sessionStorage.username.toString();
		    if (temp == '' || temp == 'undefined' || temp == 'null') {
		  			this.$router.push({path: '/'})
		  	    }
		},
		mounted: function () {
			this.initInfo();
			$("#birthday").solarlunar();
		},
		methods:  {

			// 获取登录者个人信息
			initInfo: function () {
				let that = this;
				$.get('http://localhost:3000/api/getUserInfo',{
					username: this.$route.params.username
				}, function(data) {
					// for (let i in data[0]) {
					// 	// console.log ('data[0][i]' + i + ":" + data[0][i])
					// 		that.userInfo[i] = data[0][i]							
					// }

					that.userInfo = data[0];

				});
			},

			// 预览图片
			preview: function (event) {
				if (!event.target.files || !event.target.files[0]) {
					return 
				}

				// // 判断传入类型
				// let reg = /^image\//;
				// if (reg.test(event.target.files[0].type)) {
				// 	let reader = new FileReader();
				// 	reader.onload = function (ev) {
				// 		$("#tempImgLG").prop('src',ev.target.result);
				// 		$("#tempImgMD").prop('src',ev.target.result);
				// 		$("#tempImgSM").prop('src',ev.target.result);
				// 		// $(".tempImg-wrap").css("background-image",'url(' + ev.target.result + ')')
				// 	}
				// 	reader.readAsDataURL(event.target.files[0])
				// } else {
				// 	alert("请上传图片文件！");
				// }
				let $img = $("#tempImgLG");
				let options = {
					aspectRatio: 1,
					viewMode: 2,		
                	preview: '.imgPreview' // 预览图的class名
				};
				let files = event.target;
				let uploadedImageURL;
				let reg = /^image\//;
				// console.log(files.files[0])
				$img.cropper(options);
				if (URL) {
						let file = files.files[0];
						console.log(file)
						if (reg.test(event.target.files[0].type)) {
							if (uploadedImageURL) {
                                URL.revokeObjectURL(uploadedImageURL);
                            }
                            uploadedImageURL = URL.createObjectURL(file);
                            // 销毁cropper后更改src属性再重新创建cropper
                            console.log(uploadedImageURL)
                            $img.cropper('destroy').prop('src', uploadedImageURL).cropper(options);
                            $(event.target).val('');
					}
				}

			},

	        crop : function () {
	        	let  that = this;
				var $image = $('#tempImgLG');
				var $target = $('#userProfile');
				let srcStr = $image.cropper('getCroppedCanvas',{
				    width:300, // 裁剪后的长宽
				    height:300
				}).toDataURL('image/jpeg');
				$target.prop('src', srcStr);
				// 更新到数据库中
				$.post('http://localhost:3000/api/updateUserProfile', {
					username: that.userInfo.username,
					srcStr: srcStr
				}, function(data, textStatus, xhr) {
					console.log(data);
					if (data.status == 'fail') {
						alert("上传失败")
					} else if (data.status == 'success') {
						alert("上传成功");
						$("#chooseModal .close").trigger('click');
					}
				});
	        }, // crop结束

	        // 保存用户修改的个人信息
	        saveUserInfo: function () {
	        	let that = this;
	        	let sex = $("[name='sex']").val(),
	        		trueName = $("#trueName").val(),
	        		industry = $("#industry").val(),
	        		job = $("#job").val(),
	        		introduce = $("#introduce").val(),
	        		birthday = $("#birthday").val();

	        	$.post('http://localhost:3000/api/updateUserInfo', {
	        		username: that.userInfo.username,
	        		sex: sex,
	        		trueName: trueName,
	        		industry: industry,
	        		job: job,
	        		introduce: introduce,
	        		birthday: birthday
	        	}, function(data, textStatus, xhr) {
	        		console.log(data) 
        			if (data.status == 'fail') {
        				alert("修改失败")
        			} else if (data.status == 'success') {
        				alert("修改成功");
        				$("#editUserInfo .close").trigger('click');
        			}
	        		
	        	});
	        }, // saveUserInfo 结束

	        // 初始化我的文章
	        initUserArticles: function () {},

	        // 初始化我的提问
	        initUserQuertions: function () {},

	        // 初始化我的关系

		},
		components: {
			myArticles
		}
	}
</script>
<style>
	.home {
		background: url(../assets/bj.png) repeat;
	}
	.home-header,
	.home-tab {
		margin: 15px 0;
		padding: 15px 0;
		background-color: #FFF;
		box-shadow: 0 0 10px 5px #EEE;
	}
	.userProfile-wrap {
		width: 150px;
		height: 150px;
	}
	.userProfile {
		width: 100%;
	}
	.userinfo {
		outline: none;
	}
	.userinfo:hover > .edit-userInfo{
		display: inline;
	}
	.edit-userInfo {
		position: absolute;
		display: none;
		top: 0;
		right: 0;
		width: 30px;
	}
	.userinfo dt {
		font-size: 24px;
		font-weight: normal;
		padding: 15px 0;
	}
	.userinfo dt:last-child {
		font-size: 16px;
		font-weight: normal;
		padding: 15px 0;
	}
	.userinfo dd:nth-child(2) {
		color: #999999;
		padding-bottom: 10px;
		border-bottom: 1px solid #EEE;
	}
	.userinfo dd span {
		display: inline-block;
		margin: 0 10px;
		font-size: 16px;
		color: #000;
	}
	.userinfo dd span:first-child {
		margin-left: 0;
		padding-left: 0;
	}
	.userinfo .user-introduce {
		padding: 10px 0;
	}
	.img-wrap {
		display: inline-block;
		position: relative;
		width: 150px;
		height: 150px;
	}
	.img-wrap img:first-child {
		width: 100%;
	}
	#file {
		position: absolute;
		opacity: 0;
		z-index: 2;
		width: 32px;
		left: 60px;
		bottom: 14px;
	}
	.img-wrap:hover > .edit_photo {
		display: inline-block;
	}
	.edit_photo {
		display: none;
		position: absolute;
		bottom: 10px;
		left: 60px;
	}
	.file-label {
		padding: 4px 8px;
		background-color: #41B886;
		color: #FFF;
	}
	.modal-body {
		height: 230px;
		padding: 10px;
	}
	.tempImg-wrap {
		height: 240px;
		overflow: hidden;
		/*background-size: 100%;
		background-size: cover;*/
	}
	.tempImg img {
		width: 100%;
	}
	#tempImgLG {
		width: 200px;
		height: 200px;
	}
/*	#tempImgMD {
		width: 120px;
		height: 120px;
	}
	#tempImgSM {
		width: 70px;
		height: 70px;
	}
	.tempImg-wrap figure {
		margin: 0;
		display: inline-block;
		float: left;
		margin-right: 60px;
	}
	figure figcaption {
		text-align: center;
	}*/
	.info-null {
		color: #e9733a !important;
		font-size: 14px !important;
	}
	.modal-body {
		height: auto;
	}
	.form-group {
		margin-left: 0 !important;
		margin-right: 0 !important;
	}
	.control-label {
		padding-right: 0 !important;
		text-align: left !important;
	}
	.home-tab .tab-pane {
		min-height: 400px;
	}
	.username-noEdit {
		display: block;
		text-align: left;
		padding: 10px 0 10px 15px;
		margin: 5px 0;
		background-color: #F3F3F3;
		border: 1px solid #EEE;
		font-size: 20px;
		font-weight: normal;
	}
    .imgPreview {
    	overflow: hidden;
		width: 150px;
		height: 150px;
    }
	.imgPreviewRound {
		border-radius: 50%;
		width: 70px;
		height: 70px;
	}
	.badge {
		margin-left: 5px;
		margin-top: -20px;
	}
	.badge-wraning {
		background-color: red;
	}
</style>