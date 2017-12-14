// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/bootstrap.min.css'  
import './assets/js/bootstrap.min'
import './assets/css/normalize.css'
import store from './store/index.js'


Vue.config.productionTip = false

Vue.filter('getDate', function(value) {
	if (!value) {
		return
	} else {
		let newDate = new Date((value * 1));
		let year = newDate.getFullYear();
		let month = newDate.getMonth();
		let day = newDate.getDate();
		let hour = newDate.getHours();
		let minute = newDate.getMinutes()
		
		return year + '-' + month + '-' + day + ' ' +  hour + ':' + minute;
	}
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
