<template>
	<div id="myQuestions">
		<ul>
			<li class="question-filter">
				<span class="questionFilter" @click="initMyQuestions('all', $event)">提问：&nbsp;{{ questionsLength }}</span>
				<span @click="initMyQuestions('audited', $event)">已审核</span>
				<span @click="initMyQuestions('notAudit', $event)">审核中</span>
			</li>
		</ul>

		<template v-if="hasQuestions">
			<li  v-for="item in myQuestions">
				<router-link :to="{path: '/q/' + item._id}">{{ item.question_title }}</router-link>
				<span>
					{{ item.question_date | getDate}}
				</span>
			</li>
		</template>
		<template v-else>
			<p class="hasQuestions">
				<span class="glyphicon glyphicon-th-list"></span>尚未有提问！
			</p>
		</template>

	</div>
</template>
<script>
	export default {
		data() {
			return {
				myQuestions: [],
			}
		},
		mounted() {
			this.initMyQuestions('all');
		},
		methods: {
			initMyQuestions(audit, event) {
				let that = this;
				$.get('http://localhost:3000/api/getMyQuestions', {
					question_author: sessionStorage.username,
					audit: audit
				}).then(data => {
					that.myQuestions = data;

					if (event) {
						$(event.target).addClass('questionFilter').siblings().removeClass('questionFilter')	
					}
				})
			}
		},
		computed: {
			hasQuestions() {
				return this.myQuestions.length > 0 ? true : false;
			},

			questionsLength() {
				return this.myQuestions.length;
			}
		}
	}
</script>
<style scoped>
	ul {
		padding-left: 16px;
	}
	li {
		list-style-type: none;
		padding: 20px 0;
		
		border-bottom: 1px solid #EEE;
	}
	li:not(:first-child) span {
		float: right;
		margin-right: 10px;
		color: #999;
	}
	.question-filter span {
		position: relative;
		margin-right: 15px;
		cursor: pointer;
	}
	.question-filter span:first-child {
		color: #349edf;
	}
	.hasQuestions {
		position: absolute;
		top: 0;
	    left: 0;
	    right: 0;
	    bottom: 0;
	    transform: translate(50%,50%);
	    font-size: 18px;
	}
	.hasQuestions span {
		margin-right: 10px;
	}
	.questionFilter::after {
		content: '';
		display: inline-block;
		position: absolute;
		bottom: -10px;
		left: 10px;
		border-bottom: 5px solid #41B886;
		border-left: 10px solid transparent;
		border-right: 10px solid transparent;
	}
</style>