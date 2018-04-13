<template>
	<div class="questions">
		<template v-for="question in questions">
			<div class="question-item">
				<div class="answer-count text-center">
					<span>0</span><small>回答</small>
				</div>
				<div class="pv-count text-center">
					<span>{{ question.question_pv }}</span><small>浏览</small>
				</div>
				<div class="question-meta">
					<span><i>{{ question.question_author}}</i>{{ question.question_date | getDate }}提问</span>
					<p class="question_title" :category="question.question_catogery">
						<router-link :to='"/q/" + question._id'>{{ question.question_title }}</router-link>
					</p>
				</div>
			</div>
		</template>
		
		<div class="row more">
			<div class="col-md-3 col-md-offset-4  col-lg-3 col-lg-offset-4">
				<div class="more">
					<span v-if="hasMore" class="hasMore" @click="moreQuestion">点击加载更多</span>
					<span v-else>不能加载更多啦！！</span>
				</div>
			</div>
		</div>

	</div>
</template>
<script>
	export default {
		props: {
			'ranking': {
				default: 'latest',
				type: String
			}
		},
		data() {
			return {
				questions: [],
				page: 1,
				hasMore: true,
			}
		},
		watch: {
			'ranking'(curr, old) {
				this.questions = [];
				this.page = 1;
				this.initquestion(this.ranking, this.page);
			}
		},
		computed: {
			questionCategory() {
				return this.$route.name == 'question' && this.$route.params.questionCategory
			}
		},
		mounted() {
			this.questions = [];
			this.initquestion(this.ranking, this.page)
		},
		methods: {
			initquestion(ranking, page) {
				let that = this;
				$.get('http://localhost:3000/api/getQuestion', {
					type: ranking,
					page: page
				}).then(data => {
					data.length > 0 ? that.hasMore = true : that.hasMore = false;

					for(let i in data) {
						that.questions.push(data[i])
					}
				})
			},

			moreQuestion() {
				this.page ++;
				this.initquestion(this.ranking, this.page);

			}
		}
	}
</script>
<style scoped>
	p {
		margin: 0;
		padding: 0;
	}
	.questions {
		padding: 10px 0 20px 25px;
	}
	.question_title::after {
		content: attr(category);
		display: inline-block;
		margin-left: 15px;
		font-size: 12px;
		background-color: rgba(1,126,102,0.08);
		color: #017E66;
		padding: 0 6px;
		line-height: 22px;

	}
	.text-center {
		text-align: center;
	}
	.question-item {
		border-bottom: 1px solid #eee;
		padding: 10px 0;
	}
	.answer-count,
	.pv-count,
	.question-meta {
		display: inline-block;
	}
	.answer-count {
		background-color: #009A61;
		margin-left: 15px;
		margin-right: 12px;
		color: #fff;
		width: 45px;
    	height: 40px;
	}
	.pv-count {
		margin-right: 12px;
		
		color: #ccc;
	}
	.answer-count small,
	.pv-count small {
		display: block;
	}
	.question-meta span {
		color: #ccc;
		font-size: 13px;
	}
	.question-meta span i {
		margin-right: 8px;
	}
	.question-meta p:nth-child(2) {
		font-size: 18px;
	}
	.more {
		margin-top: 26px;
	}
	.hasMore {
		cursor: pointer;
	}
	.hasMore::after {
		content: url(../assets/more.png);
		display: inline-block;
		position: absolute;
		padding-left: 8px;
		margin-top: 2px;
	}
</style>