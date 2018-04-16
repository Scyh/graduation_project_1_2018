<template>
	<div id="myQuestions">
		<ul>
			<li class="question-filter">
				<span class="question-filter" @click="initMyQuestions('all', $event)">文章：&nbsp;{{ questionsLength }}</span>
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
			initMyQuestions(audit) {
				let that = this;
				$.get('http://localhost:3000/api/getMyQuestions', {
					question_author: sessionStorage.username,
					audit: audit
				}).then(data => {
					console.log(data);
					that.myQuestions = data;
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
	
</style>