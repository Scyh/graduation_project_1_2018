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
			if (sessionStorage.admin != 'admin') {
				console.log('当前不是管理员登录');
				alert("当前不是管理员登录")
				this.$router.replace('/')
			}
		},

	}
</script>
<style>
	
</style>