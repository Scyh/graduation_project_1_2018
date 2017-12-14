<template>
	<div class="home">
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<div class="home-header">
						<div class="row">
							<div class="col-md-3">
								<div class="img-wrap">
									<img src="../assets/index.png" id="userProfile">
									
									<span class="edit_photo" data-toggle="modal" data-target="#chooseModal">
										<img src="../assets/edit_photo.png">
									</span>
								</div>
							</div>

						</div>
					</div>
					<div class="home-tab">
						
					</div>
				</div>
			</div>
		</div>


	<div class="modal fade" tabindex="-1" role="dialog" id="chooseModal">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal"></button>
	        <label for="file" class="file-label">请选择头像</label><input type="file" id="file" @change="preview($event)">
	      </div>
	      <div class="modal-body">
	        <div class="tempImg-wrap">
	        	<!-- <img src="../assets/index.png" id="tempImg"> -->
	        </div>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
	        <button type="button" class="btn btn-primary" @click="saveImg">保存</button>
	      </div>
	    </div><!-- /.modal-content -->
	  </div><!-- /.modal-dialog -->
	</div><!-- /.modal -->


	</div>
</template>
<script>
	export default {
		data: function () {
			return {}
		},
		beforeCreate: function () {
			let temp = sessionStorage.username.toString();
		    if (temp == '' || temp == 'undefined' || temp == 'null') {
		  			this.$router.push({path: '/'})
		  	    }
		},
		computed:  {
			currentUserHome: function () {
				return '#/' + this.$route.params.username + '/home'
			}
		},
		mounted: function () {
		},
		methods:  {
			upload: function () {
				let img = $("#file").val();
				console.log(img)
			},

			// 预览图片
			preview: function (event) {
				console.log(event.target.files);
				let reader = new FileReader();
				reader.onload = function (ev) {
					// $("#tempImg").prop('src',ev.target.result);
					$(".tempImg-wrap").css("background-image",'url(' + ev.target.result + ')')
				}
				reader.readAsDataURL(event.target.files[0])
			},

			// 保存图片
			saveImg: function () {

			},

		}
	}
</script>
<style>
	.img-wrap {
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
		padding: 15px;
	}
	.tempImg-wrap {
		width: 200px;
		height: 200px;
		overflow: hidden;

		background-size: 100%;
		background-size: cover;
	}
	.tempImg-wrap img {
		max-width: 100%;
	}
</style>