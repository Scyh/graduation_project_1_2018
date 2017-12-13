<template>
	<div class="home">
		<p>这里是个人主页</p>
	</div>
</template>
<script>
	export default {
		data: function() {
			return {}
		},
		beforeCreate: function() {
			console.log('benforeCreate');
			let temp = sessionStorage.username.toString();
	    if (temp == '' || temp == 'undefined' || temp == 'null') {
	  			this.$router.push({path: '/'})
	  	    }
		},
	}
</script>
