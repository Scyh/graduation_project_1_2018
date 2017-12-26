<template>
	<div id="admin_Article_Manage" @fn="test(data)">
		文章管理
	</div>
</template>
<script>
	export default {
		data () {
			return {}
		},
		mounted () {
			console.log('admin_Article_Manage')
		},
		methods: {
			test(data) {
				console.log(data)
			}
		}

	}
</script>
<style scoped>
	
</style>