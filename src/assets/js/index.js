$(function() {
	$("#returnTop").click(function(event) {
		let scrollTop = $(document).scrollTop();
		let time = setInterval(function() {
			scrollTop = scrollTop - 20;
			$(document).scrollTop(scrollTop);
			if(scrollTop<=0) clearInterval(time);
		},10)
	});

	$(document).scroll(function(event) {
		if($(this).scrollTop() == 0) {
			$("#returnTop").hide();
		} else {
			$("#returnTop").show();
		}
	});

})