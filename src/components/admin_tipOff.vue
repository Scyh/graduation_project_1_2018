<template>
	<div id="tipOff">
		<table class="table">
			<thead>
				<tr>
					<th>#</th>
					<th>举报者</th>
					<th>被举报者</th>
					<th>举报文章</th>
					<th>举报原因</th>
					<th>举报时间</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item, index) in tipOffs" class="tip-off-content" :id="item.tip_off_article_id">
					<th>{{ index + 1 }}</th>
					<th>{{ item.tip_off_by }}</th>
					<th>{{ item.tip_off_to }}</th>
					<th data-toggle="modal" data-target="#adminCheckArticleModal" @click="transfer($event)">{{ item.tip_off_article_title }}</th>
					<th>{{ item.tip_off_content }}</th>
					<!-- <th><router-link :to="item.tip_off_to + '/articles/' + item.tip_off_article_id">{{ item.tip_off_article_title }}</router-link></th> -->
					<th>{{ item.tip_off_date | getDate }}</th>
				</tr>
			</tbody>
		</table>
	
		<admin-check-article-modal></admin-check-article-modal>

	</div>
</template>
<script>
	import bus from '../bus.js'
	import adminCheckArticleModal from './admin_check_article_modal.vue'

	export default {
		data() {
			return {
				tipOffs: [],
				currentTipOffPage: 1
			}
		},
		mounted() {
			this.init(this.currentTipOffPage)
		},
		methods: {
			init(page) {
				let that = this;
				$.get('http://localhost:3000/api/admin/getTipOff', {
					page: page
				}, function(data) {
					console.log(data)
					if (data.status) {
						return
					}
					data.forEach(item => {
						that.tipOffs.push(item)
					})
				});
			},	// init end

			transfer(event) {
				// console.log($(event.target).parent().attr('id'))
				bus.$emit('transferArticle_id', $(event.target).parent().attr('id'))
			},

		},	// methods end
		components: {
			adminCheckArticleModal
		}
	}
</script>
<style scoped>
	tbody > tr > th:nth-child(2),
	tbody > tr > th:last-child {
		color: #999;
	}
	tbody > tr > th:nth-child(3) {
		color: #F00;
	}
	tbody > tr > th:nth-child(4) {
		cursor: pointer;
		color: #349edf;
	}
	tbody > tr > th:nth-child(4):hover {
		color: #8e959a;
	}
	tbody > tr > th:nth-child(5) {
		max-width: 400px;
	}
</style>