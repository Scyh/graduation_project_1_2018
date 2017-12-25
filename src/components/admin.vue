<template>
	<div>
		<div class="container">
			<div class="row">
				管理员界面
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		beforeCreate: function () {
			console.log('sessionStorage.admin: ' + sessionStorage.admin)
			if (sessionStorage.admin !== 'admin') {
				console.log('当前不是管理员登录');
				alert("管理员已退出或当前不是管理员登录")
				this.$router.replace('/')
			}
		},

	}
</script>
<style>
	
</style>