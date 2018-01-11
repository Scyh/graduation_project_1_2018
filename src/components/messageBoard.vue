<template>
	<div id="message">
		<div class="container">
			<div class="row">
				<div class="col-md-8">
					<!-- <div class="msgBg"> -->
						<!-- <img class="msgBg" src="../assets/messageBoard.jpg" /> -->
						<h3>留言板</h3>
					<!-- </div> -->
					<ul class="message">
						<li v-for="(item, index) in msg">
							<div class="row">
								<div class="col-md-12 message-by">
									{{ item.msg_by }}
								</div>
								<div class="col-md-offset-1 col-md-8 message-content">
									{{ item.msg_content }}
								</div>
								<div class="col-md-2">
									{{ item.msg_date | getDate }}
								</div>
							</div>
						</li>
					</ul>
					<div class="col-md-offset-4 col-md-3 loadMore" @click="loadMore">加载更多<span class="glyphicon glyphicon-menu-down"></span></div>
				</div>
				<div class="col-md-4">
					<div class="panel panel-default widget">
					    <div class="panel-heading">快来添加留言吧！</div>
					    <div class="panel-body">
					        <div class="row">
					        	<div class="col-md-12">
					        		<textarea class="form-control" id="msgContent"></textarea>	
					        	</div>
					        	<div class="col-md-offset-7 col-md-5">
						        	<button class="btn btn-default" @click="reset">清空</button>
									<button class="btn btn-primary" @click="leaveMsg">留言</button>	
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
	export default {
		data() {
			return {
				msg: [],
				currentPage: 1
			}
		},
		mounted() {
			this.init(this.currentPage, 4)
		},
		methods: {

			init(page, itemShow) {
				let that = this;
				$.get('http://localhost:3000/api/getMsg',{
					page: page,
					itemShow: itemShow
				}, function(data) {
					console.log(data)
					if (data.status == 'success') {
						if (data.msg.length == 0) {
							$(".loadMore").html('不能加载更多啦')
						}
						for(let i in data.msg) {
							that.msg.push(data.msg[i])
						}
					}
				});
			},	// init end

			// 加载更多
			loadMore() {
				this.currentPage ++;
				this.init(this.currentPage, 4);
			},

			// 留言
			leaveMsg() {
				let that = this;
				let msgContent = $("#msgContent").val();
				if (msgContent == '') {
					return 
				}
				$.post('http://localhost:3000/api/leaveMsg', {
					msg_by: sessionStorage.username,
					msg_content: msgContent
				}, function(data, textStatus, xhr) {
					console.log(data)
					alert("留言成功");
					that.reset();
					that.msg = [];
					that.currentPage = 1;
					that.init(that.currentPage, 4);
				});
			},

			reset() {
				$("#msgContent").val("")
			},
		},
	}
</script>
<style scoped>
	.msgBg {
		margin-top: 15px;
		width: 10%;
	}
	.container > .row {

	}
	.message {
		padding: 15px 0;
		min-height: 500px;

	}
	.message li {
		list-style: none;
		padding: 15px 10px;
		border-bottom: 1px dashed #999;
		font-size: 18px;
	}
	.message li .row > div:first-child {
		padding-bottom: 10px;
	}
	.message li > div:nth-child(2) {

	}
	.message li .row > div:last-child {
		margin-top: 5px;
		font-size: 14px;
		color: #999;
	}
	.loadMore {
		padding-bottom: 15px;
		cursor: pointer;
	}
	.widget {
		margin-top: 15px;
		position: fixed;
		box-shadow: 0 0 10px #D7D7D7;
	}
	textarea {
		min-height: 120px;
		resize: none;

	}
	.btn {
		margin: 10px 0 5px 0;
		padding: 3px 6px !important;
	}
	/*.fixed {
		
		right: 30px;
		width: 400px;
	}*/
</style>