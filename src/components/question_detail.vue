<template>
	<div>
		<div class="container">
			<div class="row question-wrap">
				<div class="row">
					<div class="question-detail-title">
						<div class="col-lg-1 col-md-1 col-sm-1 text-center">
							<span class="question-logo">问</span>
						</div>
						<div class="col-lg-11 col-md-11 col-sm-11">
							<h2>{{ questionDetail.question_title }}</h2>
								<p>
									<span class="question-category">{{ questionDetail.question_catogery }}</span>
									<span class="question-author">{{ questionDetail.question_author }}</span>
									<span class="question-data">{{ questionDetail.question_date | getDate }}</span>
								</p>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="question-detail-body">
							<div class="col-lg-1 col-md-1 col-sm-1 text-center">
								<div :class="[questionDetail.question_solve == 'no' ? 'glyphicon-question-sign' : 'glyphicon-ok-sign', 'solve-icon', 'glyphicon']"></div>
							</div>
							<div class="col-lg-11 col-md-11 col-sm-11 question-text">
									<p v-html="questionDetail.question_text"></p>
							</div>
					</div>
				</div>	
			</div>
				
			<div class="row">
				<div class="answers">
					<div class="answers-title">
						<h3>{{ answerCount }}个回答</h3>
					</div>
					<div class="answers-body">
						
						<!-- <div class="row answer">
							<div class="col-lg-1 col-md-1 col-sm-1">
							xxx
							</div>
							<div class="col-lg-11 col-md-11 col-sm-11">
								<div>
									<p class="answer-text">当然是你请求的接口返回给你的，你请求的这个接口计算了json文件数组的长度，你请求此接口，返回json列表的下标、下标对应的值以及json列表的length给你。</p>
									<div class="answer-meta">
										<span>xx-xx-xx时间</span>
										<span>0评论</span>
										<span class="pull-right">xxx</span>
									</div>
									<div class="answer-comment">
										<div class="row">
											<div class="col-md-10 col-lg-10">
												<textarea class="form-control" placeholder="不要在评论中回答问题"></textarea>
											</div>
											<div class="col-md-2 col-lg-2">
												<button class="btn">提交评论</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
 -->
						<template v-for="answer in answers">
							<div class="row answer">
								<div class="col-lg-1 col-md-1 col-sm-1 text-center">
									<div :class="[{'glyphicon-ok-sign': answer.answer_adopt}, 'solve-icon', 'glyphicon']"></div>
								</div>
								<div class="col-lg-11 col-md-11 col-sm-11">
									<div class="answer-content">
										<p class="answer-text" v-html="answer.answer_text"></p>
										<div class="answer-meta">
											<i  v-if="canEdit" :class="[{'hasSolved': hasSolved}, 'pull-right', 'btn', 'btn-adopt']" :id="answer._id" @click="adopt">采纳</i>
											<span :data-author="answer.answer_author">{{ answer.answer_author }}</span>
											<span>{{ answer.answer_date | getDate }}</span>
											<!-- <span>0评论</span> -->
											<!-- <button class="btn btn-primary pull-right">采纳</button> -->

										</div>
										<!-- <div class="answer-comment">
											<div class="row">
												<div class="col-md-10 col-lg-10">
													<textarea class="form-control" placeholder="不要在评论中回答问题"></textarea>
												</div>
												<div class="col-md-2 col-lg-2">
													<button class="btn">提交评论</button>
												</div>
											</div>
										</div> -->
									</div>
								</div>
							</div>
						</template>

					</div>
					<div v-if="questionDetail.audit == 'audited'" class="answers-foot">
						<div class="row">
							<div class="col-lg-12 col-md-12">
								<h3>撰写答案</h3>
							</div>
							<div class="col-lg-12 col-md-12">
								<!-- <mavon-editor :value='answerText' @imgAdd=""></mavon-editor> -->
								<editor :answerQuestion="true"></editor>
							</div>
							<div class="col-lg-12 col-md-12">
								<button v-if="hasLogIn" class="btn btn-primary pull-right" @click="answerQuestion">提交</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			
		</div>
 

	</div>
</template>
<script>
	import editor from './edit.vue'
	import { mapGetters } from 'vuex'

	export default {
		data() {
			return {
				questionDetail: {},
				answers: [],
				answerCount: 0,
				answerText: '',	// 撰写的答案
				hasSolved: false,
			}
		},
		computed: {
			question_id() {
				return this.$route.params.id
			},
			...mapGetters([
		        'hasLogIn'
		    ]),
		    canEdit() {
		    	return sessionStorage.username && sessionStorage.username == this.questionDetail['question_author'];
		    },

		},
		mounted() {
			this.initQuestion(this.question_id).then(() => {
				this.initAnswer(this.question_id)
			})
		},
		methods: {

			// 初始化问题
			initQuestion(question_id) {
				let that = this;
				var p = new Promise((resolve, reject) => {
					$.get('http://localhost:3000/api/getQuestionDetail', {
						question_id: question_id
					}).then(data => {
						console.log(data.question_text)
						let div = document.createElement('div');
						div.innerHTML = data.question_text;
						data.question_text = div.innerText;
						
						that.questionDetail = data;
						
						// 判断问题是否被解决
						if (data.question_solve == 'yes') {
							that.hasSolved = true;
						}

						resolve('initQuestion success');
					}).catch(err => {
						reject('initQuestion fail');
						console.log(err)
					})
				})
				return p;
			},

			// 初始化答案
			initAnswer(question_id) {
				let that = this;
				$.get('http://localhost:3000/api/getQuestionAnswer', {
					question_id: question_id
				}).then(data =>{ 
					for(let i in data) {
						let div = document.createElement('div');
						div = document.createElement('div')
						div.innerHTML = data[i].answer_text;
						data[i].answer_text = div.innerText
					}
					that.answers = data;
					that.answerCount = data.length;
				}).catch(err => {
					console.log(err)
				})
			},

			// 回答问题
			answerQuestion() {
				let that = this;
				let answer_text = $(".v-show-content-html").html().trim(),
					answer_author = sessionStorage.username;

				if (answer_text == '') {
					alert("请输入内容")
				} else {
					$.post('http://localhost:3000/api/answerQuestion', {
						answer_author: answer_author,
						answer_text: answer_text,
						answer_date: new Date().valueOf(),
						answer_belongsTo: that.question_id
					}).then(data => {
						that.answerCount ++;
						let div = document.createElement('div');
						div = document.createElement('div')
						div.innerHTML = data.newAnswer.answer_text;
						data.newAnswer.answer_text = div.innerText;
						that.answers.push(data.newAnswer);
						$("textarea").val('');
						that.addNotice(that.questionDetail.question_author, 'newAnswer');
						alert("回答成功");
					}).catch(err => {
						alert("回答失败");
					})
				}
			},

			// 采纳
			adopt(ev) {
				if (!this.hasSolved) {
					let $target = $(ev.target);
					// console.log($(ev.target).next().data('author'))
					var result = confirm('确认采纳？');
					if (result) {
						let that = this;
						$.post('http://localhost:3000/api/adoptQuestion', {
							answer_id: $target.prop('id'),
							question_id: that.question_id
						}).then(data => {
							alert("采纳成功");
							$(ev.target).parents('.answer').find('.solve-icon').addClass('glyphicon glyphicon-ok-sign');
							that.hasSolved = true;
						}).catch(err => {
							console.log(err)
							alert('采纳失败')
						}).then(() => {

							that.addNotice($target.next().data('author'), 'adopt');
						})		
					}
				}
			},

			addNotice: function (toUser,type) {
				let that = this;
				$.post('http://localhost:3000/api/addNotice', {
					notice_user: toUser,
					notice_state: "notRead",
					notice_date: Date.parse(new Date()),
					notice_ByUser: sessionStorage.username,
					notice_type: type,
					notice_title: that.questionDetail.question_title,
					notice_title_id: that.question_id
				}, function(data, textStatus, xhr) {
					if (data.status == 'success') {
						console.log("添加通知成功")
					}					
				});
			},

			showCommentForm(ev) {
				$(ev.target).parent().next('.answer-comment').toggle()
			}
		},
		components: {
			editor
		}
	}
</script>
<style scoped>
	.question-wrap {
		padding: 20px 0 25px;
		border-bottom: 2px solid #ccc;
		font-size: 16px;
	}
	.question-detail-title, 
	.question-detail-body {
		overflow: hidden;
	}
	.question-detail-title {
		margin: 20px 0;
		padding-bottom: 20px;
		border-bottom: 1px solid #eee;
	}
	.question-detail-body {
		margin: 20px 0;
	}
	.question-logo {
		margin-right: 15px;
		padding: 5px;
		font-size: 18px;
		border: 1px solid #41B886;
		color: #41B886;
		font-weight: 400;
		border-radius: 50%;
	}
	.question-category {
		font-size: 12px;
		background-color: rgba(1,126,102,0.08);
		color: #017E66;
		display: inline-block;
		padding: 0 8px;
		line-height: 22px;
		cursor: pointer;
	}
	.question-author {
		margin: 0 10px;
		color: #009a61;
		font-weight: 600;
	}
	.question-detail-title p > span:last-child {
		color: #ccc;
		font-size: 14px;
	}
	.answers {
		margin: 85px 0 30px 0;
	}
	.answers-title {
		margin-bottom: 20px;
		border-bottom: 2px solid #ccc;
	}
	.answers-body {
		padding-bottom: 35px; 
	}
	.answer {
		padding: 15px 0;
	}
	.answer-content {
		padding-bottom: 15px;
		border-bottom: 1px solid #ccc;
	}
	.answer-text {
		min-height: 55px;
		font-size: 16px;
	}
	.answer-meta {
		font-size: 14px;
		color: #999;
	}
	span:hover {
		color: #333;
	}
	.answer-meta span:nth-child(2) {
		cursor: pointer;
	}
	.answer-comment {
		margin-top: 15px;
		display: none;
	}
	.answer-comment textarea {
		min-height: 40px;
		resize: vertical;
	}
	.solve-icon {
		width: 40px;
	    height: 55px;
	    margin: 0 auto;
	    font-size: 36px;
	    /*line-height: 50px;*/
	    background: #f3f3f3;
		color: #009A61;
	    box-shadow: 0 2px 5px rgba(0,0,0,0.3);
	    text-align: center;
	}
	.btn-adopt {
		background-color: #bc3e3e;
		color: #fff;
	}
	.hasSolved {
		background-color: #808B87;
		cursor: default;
	}
</style>