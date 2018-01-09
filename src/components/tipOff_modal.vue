<template>
	<div class="tip-off-modal">
		<div class="modal fade" tabindex="-1" id="tipOffModal">
		    <div class="modal-dialog" role="document">
		  		<div class="modal-content">
		      		<div class="modal-header">
		        		<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		        		<h4 class="modal-title">举报当前用户或文章</h4>
		      		</div>
			      	<div class="modal-body">
						<form>
							<div class="form-group">
								<div class="row">
									<div class="col-md-2">举报内容</div>
									<div class="col-md-9">
										<textarea id="tipOffContent" class="form-control"></textarea>
									</div>
								</div>
							</div>
							<div class="form-group">
								<div class="row">
									<div class="col-md-offset-2 col-md-10">
										<span @click="addReason($event)">色情</span>
										<span @click="addReason($event)">暴力</span>
										<span @click="addReason($event)">赌博</span>
										<span @click="addReason($event)">内容不适</span>
										<span @click="addReason($event)">言论不当</span>
										<span @click="addReason($event)">其他原因</span>
									</div>
								</div>
							</div>
						</form>
			      	</div>
			      	<div class="modal-footer">
			        	<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
			        	<button type="button" class="btn btn-danger" @click="confirmTipOff">确认举报</button>
			      	</div>
		    	</div><!-- /.modal-content -->
		  	</div><!-- /.modal-dialog -->
		</div><!-- /.modal -->
	</div>
</template>
<script>
	export default {
		props:['_id'],
		mounted() {
		},
		methods: {

			// 添加举报原因
			addReason(event) {
				if ($("#tipOffContent").val().indexOf($(event.target).html()) > -1) {
					return
				}
				$("#tipOffContent").val($("#tipOffContent").val() + ' ' + $(event.target).html() + ' ');
				
			},

			// 确认举报
			confirmTipOff() {
				console.log($(".tip-off-modal").attr('articleid'))
				
			},

		}
	}
</script>
<style scoped>
	.modal-body textarea {
		resize: none;
		min-height: 200px;
	}
</style>