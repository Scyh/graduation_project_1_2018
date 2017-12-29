<template>
	<div id="edit">
		<div id="edit-title">
			<div class="row">
				<div class="col-md-12">
					<input type="text" id="article_title" class="form-control" placeholder="请填写文章标题">
					<button class="btn btn-danger" id="publish" @click="publish()">发表文章</button>
				</div>
			</div>
		</div>
		<div>
			<mavon-editor :value='value'></mavon-editor>
		</div>
	</div>
</template>
<script>
	import { mavonEditor } from 'mavon-editor'

	export default {
		data() {
			return {
				value: '',
			}
		},
		beforeCreate() {
			if (sessionStorage.username == undefined || sessionStorage.username == 'undefined' || sessionStorage.username == '') {
				alert("尚未登录")
				this.$router.push('/')
			}
		},
		mounted() {
			this.$store.dispatch('isEdit')
		},
		destroyed() {
			this.$store.dispatch('notEdit')
		},
		methods: {
			publish() {
				let that = this;
				let title = $("#article_title").val().trim();
				let content = $(".v-show-content-html").html().trim();
				let author = sessionStorage.username

				if (title == '') {
					$("#article_title").focus();
				} else if (content == '') {
					$(".auto-textarea-input").focus()
				} else {
					$.post('http://localhost:3000/api/publish', {
						title: $("#article_title").val(),
						content: $(".v-show-content-html").html(),
						author: sessionStorage.username
					}, function(data, textStatus, xhr) {
						if (data.status == 'success') {
							alert('发表成功,审核中')
							that.$router.replace('/' + author + '/home')
						}
					});	
				}

				
			}
		},
		components: {
			mavonEditor
		}
	}
</script>
<style scoped>
	#edit-title {
		margin: 15px 5px;
	}
	#edit-title > .row > div {
		position: relative;
	}
	#edit-title input {
		border: none;
		height: 50px;
		font-size: 26px;
		cursor: pointer;
	}
	#edit-title input:focus {
		border: none;
		outline: none;
		box-shadow: none;
	}
	#edit-title #publish {
		border-radius: 2px;
		height: 50px;
		font-size: 20px;
		position: absolute;
		top: 0;
		right: 20px;
	}
	.v-note-wrapper {
		position: absolute;
		top: 100px;
		left: 0;
		right: 0;
		bottom: 0;
		height: 100%;
	}
	.v-note-panel {
		height: 90%;
	}
</style>