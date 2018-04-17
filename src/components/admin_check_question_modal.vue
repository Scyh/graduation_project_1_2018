<template>
	<div>
		<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" id="adminCheckQuestionModal">
		    <div class="modal-dialog modal-lg" role="document">
		    	<div class="modal-content">
		    		<div class="modal-header">
		    			<button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
       					<h4 class="modal-title">{{ question_checked.question_title }}</h4>
       					<div class="article-meta">
       						<div class="row">
       							<div class="col-md-offset-4 col-md-5">
       								<span>作者：{{question_checked.question_author}}</span>  
       								<span>发表时间：{{ question_checked.question_date | getDate}}</span>
       							</div>
       						</div>
       					</div>
		    		</div>
		    		<div class="modal-body">
		    			<div class="row">
		    				<div class="col-md-offset-1 col-md-10 article-content">
		    					<p v-html="question_checked.question_text"></p>
		    				</div>
		    			</div>
		    			<div class="row">
		    				<div class="article-meta col-md-offset-1 col-md-10">
		    					<span>提问id：{{ question_checked._id }}</span>
		    					<span>浏览量：{{ question_checked.question_pv }}</span>
		    					<span>主标签：{{ question_checked.category }}</span>
		    				</div>
		    			</div>
		    		</div>
		    		<div class="modal-footer">
		    			<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
		    		</div>
		    	</div>
		    </div>
		</div>
	</div>
</template>
<script>
	import bus from '../bus.js'
	export default {
		data() {
			return {
				question_checked: {},
			}
		},	// data end
		mounted() {
			bus.$on('transferQuestion_id', data => {
				// console.log(data)
				this.init(data);
				
			})
		},	// mounted end
		destroyed() {
			bus.$off('transferQuestion_id')
		},
		methods: {
			init (id) {
				let that = this;
				that.question_checked = {};
				$.get('http://localhost:3000/api/getQuestionDetail', {
					question_id: id
				}).then(data => {
					// console.log(data)
					let el = document.createElement('div');
					$(el).html(data.question_text);
					data.question_text =  $(el).text();

					that.question_checked = data;
				})				
			}
		},	// methods end
	}
</script>
<style scoped>
	.modal-header {
		padding-bottom: 0;
	}
	.modal-title {
		text-align: center;
		font-size: 20px;
	}
	.modal-body {
		padding: 30px 30px 0;
	}
	.article-content {
		min-height: 400px;
		padding-bottom: 15px;
	}
	.article-meta {
		padding: 15px;
		color: #999;
	}
	.article-meta span {
		margin-right: 15px;
	}
</style>