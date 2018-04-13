<template>
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<div id="edit">
					<div id="edit-title">
						<div class="row">
							<div class="col-md-12">
								<div class="col-md-1 label">
									<select class="category">
										<option value="" checked>选择标签</option>
										<option value="html">html</option>
										<option value="css">css</option>
										<option value="javascript">javascript</option>
										<option value="css3">css3</option>
										<option value="html5">html5</option>
										<option value="jquery">jquery</option>
										<option value="bootstrap">bootstrap</option>
										<option value="webpack">webpack</option>
										<option value="vue">vue</option>
										<option value="react">react</option>
										<option value="nodejs">nodejs</option>
										<option value="mongoodb">mongodb</option>
									</select>
								</div>
								<div class="col-md-10 title">
									<input type="text" v-if="!isQuestion" id="article_title" class="form-control" placeholder="请填写文章标题">

									<input type="text" v-else id="question_title" class="form-control" placeholder="请填写问题标题">

								</div>
								<div class="col-md-1">
									<button class="btn btn-danger" v-if="!isQuestion" id="publish" @click="publish()">发表文章</button>
									<button class="btn btn-danger" v-else id="publish" @click="">提问问题</button>
								</div>
							</div>
						</div>
					</div>
					<div id="edit-content">
						<div class="row">
							<div class="col-md-12">
								<mavon-editor id="md" :value='value' @imgAdd="imgAdd" ref=md></mavon-editor>
							</div>
						</div>
					</div>
					<div class="saveDraft" v-if="!isQuestion">
						<div class="row">
							<div class="col-md-12">
								<label>文章副标签：</label>
								<div class="newLabel">
									<label class="addNew" @click='addNewLabel($event)'>添加标签</label>
								</div>		
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { mavonEditor } from 'mavon-editor'
	import bus from '../bus.js'

	export default {
		props: {

			// 提问问题页面
			isQuestion: {
				default: true
			},

			// 回答问题
			answerQuestion: {
				default: false
			}
		},
		data() {
			return {
				value: '',
				isReEdit: false,	// 是否是编辑旧文章
			}
		},
		beforeMount() {
			// if (sessionStorage.username == undefined || sessionStorage.username == 'undefined' || sessionStorage.username == '') {
			// 	alert("尚未登录")
			// 	this.$router.push('/')
			// 	console.log(sessionStorage.forbidden)
			// } else if (sessionStorage.forbidden == 'true') {
			// 	alert("当前已被禁言")
			// 	this.$router.push('/')
			// }
		},
		mounted() {
			this.$store.dispatch('isEdit');
			if (this.$route.query.id) {
				// console.log(this.$route.query.id)
				this.isReEdit = true;
				this.getOldArticle(this.$route.query.id);
			}

			// if (this.answerQuestion) {
			// 	$(".fa-mavon-eye-slash").trigger('click')	
			// }
			
		},
		destroyed() {
			// 不是编辑状态
			this.$store.dispatch('notEdit')
		},
		methods: {
			publish() {
				let that = this,
					title = $("#article_title").val().trim(),
					md_content = $(".auto-textarea-input").val(),
					content = $(".v-show-content-html").html(),
					category = $(".category").val(),
					author = sessionStorage.username,
					subLabel = '';

				if ($(".newLabel").find(".name").length > 0) {
					console.log()
					let nameArr = $(".newLabel").find(".name")
					nameArr.each(function(index, el) {
						subLabel += $(el).html() + ','
					});
				} else {
					subLabel = category + ','
				}

				if (title == '') {
					$("#article_title").focus();
				} else if (content == '') {
					$(".auto-textarea-input").focus()
				} else if (category == '') {
					// alert("请选择文章类别,下方可添加文章副标签");
					$(".category").focus()
				} else {
					
					// console.log(title)
					// console.log(content)
					// console.log(category)
					// console.log(author)
					// console.log(subLabel)

					// 判断是发表新文章还是编辑旧文章
					if (this.isReEdit) {
						$.post('http://localhost:3000/api/upadteOldArticle', {
							id: that.$route.query.id,
							title: title,
							md_content: md_content,
							content: content,
							category: category,
							subLabel: subLabel
						}, function(data, textStatus, xhr) {
							if (data.status == 'success') {
								alert('发表成功,审核中')
								that.$router.replace('/' + author + '/home')
							}
						});
					} else {

						$.post('http://localhost:3000/api/publish', {
							title: title,
							md_content: md_content,
							content: content,
							category: category,
							subLabel: subLabel,
							author: author
						}, function(data, textStatus, xhr) {
							if (data.status == 'success') {
								alert('发表成功,审核中')
								that.$router.replace('/' + author + '/home')
							}
						});
					}

				}
			},	// publish end

			// 添加新的副标签
			addNewLabel(event) {
				let $newLabel = $(".newLabel")
				let $addNew = $(".addNew");
				// if ($(event.target).prev().html() == '') {
				// 	$(".name").focus()
				// 	return 
				// }
				let span = `<span class='name' @keydown='fn' contenteditable='true'></span>`;
				$(event.target).before(span);
				$(".name").focus().on('blur', ev => {

					// 判断是否为空，为空则移除
					if ($(ev.target).text() == '') {
						console.log()
						$(ev.target).parent().children().eq($(ev.target).index()).remove()
					}

					if ($addNew.prevAll('.name').length < 5) {
						$addNew.show()
					}
				}).on('keydown', ev => {
					if (ev.keyCode == 13) {
						return false
					}
				})

				if ($addNew.prevAll('.name').length > 4) {
					$addNew.hide()
				}
			},	// addNewLabel end

			getOldArticle(id) {
				let that = this;
				$.get('http://localhost:3000/api/getArticleDetail', {
					_id: id
				}, function(data) {
					// console.log(data)
					$("#article_title").val(data.article_title);
					// $(".auto-textarea-input").val(data.article_md_content);
					that.value = data.article_md_content
					$(".category").val(data.category)
	
					let article_labelArr =  (data.article_label + '').split(',')
					article_labelArr.forEach((item, index) => {
						
						if (index == article_labelArr.length-1) {
							return
						}

						let span = `<span class='name' contenteditable='true'>${item}</span>`;
						$(".addNew").before(span);
						$(".name").focus().on('blur', (ev) => {

							// 判断是否为空，为空则移除
							if ($(ev.target).text() == '') {
								console.log()
								$(ev.target).parent().children().eq($(ev.target).index()).remove()
							}

							if ($(".addNew").prevAll('.name').length < 5) {
								$(".addNew").show()
							}
						}).on('keydown', ev => {
							if (ev.keyCode == 13) {
								console.log(1)
								return false
							}
						})
					})
				});
			},


			// 添加图片
			imgAdd(pos, $file) {
				let that = this;
				console.log()
				// console.log($file.type.slice($file.type.lastIndexOf('/') +1,$file.type.length))
				// console.log($file.miniurl.replace(/^data:image\/\w+;base64,/, ''))
				$.post('http://localhost:3000/api/img/add', {
					lastModified: $file.lastModified,
					type: $file.type.slice($file.type.lastIndexOf('/') +1,$file.type.length),
					miniurl: $file.miniurl.replace(/^data:image\/\w+;base64,/, ''),
					name: $file.name,
					author: sessionStorage.username
				}, function(data, textStatus, xhr) {
					if (data.status == 'success') {
						// console.log(data.imgUrl);
						// console.log(that.$refs.md)
						that.$refs.md.$img2Url(pos, data.imgUrl)
					} else {
						alert('上传失败')
					}
				});
			},	// imgAdd end

		},	// methods end
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
	.label {
		padding: 0;
		font-size: 18px;
		text-align: left;
	}
	.label select{
		color: #4f4f4f;
		border: none;
		width: 120px;
		background-color: #EFEFEF;
		line-height: 30px;
		padding: 14px 0;
		text-indent: 15px;
		font-weight: normal;
		margin-left: -20px;
	}
	.label select option {
		font-size: 16px;
		text-align: left;
	}
	.title input {
		border: none;
		height: 50px;
		font-size: 26px;
		cursor: pointer;
		background-color: #EFEFEF;
	}
	.title input:focus {
		border: none;
		outline: none;
		box-shadow: none;
	}
	#publish {
		border-radius: 2px;
		padding: 10px 8px;
		/*margin-left: -5px;*/
		font-size: 20px;
	}
	#edit-content {
		margin: 10px -15px;
	}
	.v-note-wrapper {
		height: 500px !important;
		/*background-color: #EFEFEF;*/
	}
	/*.auto-textarea-wrapper .auto-textarea-input.no-border {
		background-color: #EFEFEF;
	}*/
	label.addNew {
		color: #349edf;
		cursor: pointer;
	}
	label.addNew::before {
		content: url(../assets/add.png);
		display: inline-block;
		position: relative;
		top: 2px;
		margin-right: 3px;
	}
</style>