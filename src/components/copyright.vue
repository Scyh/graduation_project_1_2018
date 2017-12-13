<template>
	<div class="copyright">
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<span>Copyright &copy; 基于B\S的前端学习网站</span>
					<span>皖SCY备00000000号</span>
					<span>皖公网安备00000000000000</span>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped>
	.copyright {
		background-color: #111111;
		text-align: center;
	}
	.copyright .row {
		padding: 30px;
	}
	.copyright span {
		padding: 10px;
		color: #505050;
		font-size: 1em;
	}
	.copyright span:not(:last-child)::after {
		content: '|';
		display: inline-block;
		position: relative;
		left: 14px;
	}
</style>