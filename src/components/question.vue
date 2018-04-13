<template>
	<div class="section3">
		<div class="container">
			<div class="row">
				<div class="col-sm-8 col-md-8 col-lg-8">
					<main>
						<div>
						  <!-- Nav tabs -->
						  <ul class="nav nav-tabs" role="tablist">
						  	<li role="presentation" data-ranking="latest" class="active" @click="toggle"><router-link to="/question/latestQuestion" data-toggle="tab">最新回答</router-link></li>
							<li role="presentation" data-ranking="hot"  @click="toggle"><router-link to="/questions/hotQuestion">最热回答</router-link></li>
						  </ul>

						  <!-- Tab panes -->
						  <div class="tab-content">								
								<question-category :ranking="ranking"></question-category>
						  </div>
						</div>
					</main>
				</div>
				<div class="col-sm-4 clo-md-4 col-lg-4">
					<aside>
						<div class="widget">
							<h3>侧栏标题</h3>

							<div class="widget_content">侧栏内容</div>
						</div>
					</aside>
				</div>
			</div> <!-- .row 结束 -->
		</div> <!-- container 结束 -->
	</div>
</template>

<script>
import $ from 'jquery'
import 	questionCategory from './questionCategory.vue'

export default {
	data: function() {
		return {
			articles: {},
			ranking: 'latest',
		}
	},
	methods: {
		toggle(ev) {
			$(".nav-tabs li").removeClass('active');
			$(ev.currentTarget).toggleClass('active');
			this.ranking = $(ev.currentTarget).data('ranking');
		},
	},
	components: {
		questionCategory,
	}

}
</script>

<style scoped>
	.section3 {
		padding-top: 60px;
		padding-bottom: 52px;
		background: url('../assets/bj.png');
	}
	.container main,
	.container .widget{
		background-color: #FFF;
		box-shadow: 0 0 10px 5px #EEE;
	}
	article {
		padding: 15px;
		border-bottom: 1px solid #EEE
	}
	article > *{
		display: inline-block;
	}
	.question_label {
		background-color: #E5E5E5;
		padding: 2px;
		font-size: 14px;
	}
	.question_title {
		font-size: 18px
	}
	.question_author {
		float: right;
	}
	.question_push_date {
		float: right;
	}
	.widget {
		padding: 15px;
	}
	.tab-content {
		overflow: hidden;
		min-height: 400px;
	}
	.nav-tabs {
		padding-top: 15px;
		margin-left: 10px;
	}
	a:hover {
		background: 0 0!important;
	}
</style>