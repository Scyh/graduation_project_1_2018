// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/bootstrap.min.css'
import './assets/js/bootstrap.min'
import './assets/css/normalize.css'
import './assets/js/jquery-solarlunar.js'
import store from './store/index.js'
import './assets/css/cropper.min.css'
import 'mavon-editor/dist/css/index.css'

Vue.config.productionTip = false

Vue.filter('getDate', function(value) {
	if (!value) {
		return
	} else {
		let newDate = new Date((value * 1));
		let year = newDate.getFullYear();
		let month = newDate.getMonth() + 1;
		let day = newDate.getDate();
		let hour = newDate.getHours();
		let minute = newDate.getMinutes()

		return year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
	}
});

Vue.filter('switchNoticeType', function(value) {
	switch (value) {
		case 'newComment':
			return "评论了你的文章";
			break;
		case 'like':
			return "点赞了你的文章";
			break;
		case 'dislike':
			return "踩了你的文章";
			break;
		case 'newCommentReply':
			return "回复了你的评论";
			break;
		default:
			return "不知道干了啥";
	}
})

Vue.filter('switchMsgStatusType', function(value) {
	switch(value) {
		case 'notRead':
			return "未读";
			break;
		case 'hasRead':
			return "已读";
			break
		default:
			return "未读"
	}
})

Vue.filter('introduceDecoration', function(value) {
	return "“ " + value + " ”"
});

Vue.filter('translate', value => {
	switch (value) {
		case 'audited':
			return "已审核"
			break;
		case 'notAudit':
			return "待审核"
	}
})

Vue.filter('switchSubLabel', value => {
	let arr = (value+'').split(',');
	let subLabelStr = '';
	arr.forEach((item, index) => {
		if (index == arr.length-1) {
			return 
		} else {
			if (index == arr.length-2) {
				subLabelStr += ` ${item} `
			} else {
				subLabelStr += ` ${item} / `
			}
			
		}

	})
	return subLabelStr;
});

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: {
		App
	}
})