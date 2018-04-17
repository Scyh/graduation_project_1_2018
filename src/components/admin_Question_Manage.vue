<template>
	<div id="admin_Question_Manage">
		<h4>Page: {{ page }}</h4>
		<table class="table">
			<thead>
				<tr>
					<th>#</th>
					<th>标题</th>
					<th>作者</th>
					<th>上传时间</th>
					<th>审核状态</th>
					<th>操作<span class="glyphicon glyphicon-refresh refresh" @click=""></span></th>
				</tr>
			</thead>
			<tbody>
				<template v-for="(item, index) in questions">
					<tr :id="item._id">
						<th>{{ index +1 }}</th>
						<th>{{ item.question_title }}</th>
						<th>{{ item.question_author }}</th>
						<th>{{ item.question_date | getDate }}</th>
						<th>
							{{ item.question_audit | translate }}
							<template  v-if="item.question_audit == 'notAudit'" >
								<span class="glyphicon glyphicon-floppy-saved audit" @click="audit(true, $event)"></span>
								<span class="glyphicon glyphicon-floppy-remove audit" @click="audit(false, $event)"></span>
							</template>
							
						</th>
						<th>
							<button class="btn btn-info" data-toggle="modal" data-target="#adminCheckQuestionModal" @click="transfer">查看</button>
							<button class="btn btn-danger" :data-id="item._id" @click="delQuestion">删除</button>
						</th>
					</tr>
				</template>
			</tbody>
		</table>
		
		<nav aria-label="Page navigation">
			<ul class="pagination">
			    <li>
				    <a href="javascript:void(0)" @click="change('prev')" title="前一页">
			        <span class="glyphicon glyphicon-chevron-left"></span>
			    	</a>
			    </li>
			    <li>
				    <a href="javascript:void(0)" @click="change('next')" title="后一页">
			        <span class="glyphicon glyphicon-chevron-right"></span>
			        </a>
			    </li>
		    </ul>
		</nav>

		<admin-check-question-modal></admin-check-question-modal>

	</div>
</template>
<script>
	import adminCheckQuestionModal from './admin_check_question_modal.vue'
	import bus from '../bus.js'

	export default {
		data() {
			return {
				page: 1,
				questions: [],
				type: 'all',
			}
		},
		mounted() {
			this.init('all', this.page);
			bus.$on('type', data => {

				if (data.name = 'question') {
					this.type = data.filter;
					this.init(data.filter, this.page);
				}
			})
		},
		beforeDestroy() {
			
			// 关闭事件监听，阻止多次触发
			bus.$off('type')
		},
		methods: {
			init(type, page) {
				let that = this;
				that.questions = [];
				that.page = 1;
				$.get('http://localhost:3000/api/admin/getQuestion', {
					type: type,
					page: page
				}).then(data => {
					that.questions = data;
				}).catch(err => {
					console.log(err)
				})
			},

			transfer() {
				bus.$emit('transferQuestion_id', $(event.target).parent().parent().prop('id'))
			},

			delQuestion(ev) {
				let result = confirm('确认删除？');
				if (result) {
					this.del($(ev.target).data('id'))
				} 
			},

			del(id) {
				let that = this;
				$.post('http://localhost:3000/api/admin/deleteQuestion', {
					_id: id
				}, function(data, textStatus, xhr) {
					if (data.status == 'success') {
						alert("删除成功");
						that.init(that.type, that.page);
					} else {
						alert("删除失败");
					}
				});
			},

			change(type) {
				if (type == 'prev') {
					if (this.page <= 1) {
						return false
					} else {
						this.page --;
						this.init(this.type, this.page);
					}
				} else if (type == 'next') {
					if (this.questions.length > 0) {
						this.page ++;
						this.init(this.type, this.page);
					}
				}
			},

			audit(audit, event) {
				if (audit) {
					let that = this;
					$.post('http://localhost:3000/api/adminquestionHasAudited', {
						id: $(event.target).parent().parent().prop('id')
					}).then(data => {
						alert('审核通过');
						that.init(that.type, that.page)
					})
				} else {
					let result = confirm('确认该提问审核失败？');
					if (result) {
						this.del($(ev.target).data('id'))
					} 
				}
			},
		},
		components: {
			adminCheckQuestionModal,
		}
	}
</script>
<style scoped>
	.jump-to a {
		margin: 0;
		padding: 0;
	}
	.jump-to input {
		width: 38px;
		height: 32px;
		text-align: center;
	}
	.refresh {
		margin-left: 30px;
		cursor: pointer;
	}
	.audit {
		margin-left: 15px;
		cursor: pointer;	
	}
</style>