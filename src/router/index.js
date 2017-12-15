import Vue from 'vue'
import Router from 'vue-router'
import app from '../App.vue'
import articles from '../components/articles.vue'
import article_detail from '../components/article_detail.vue'
import personalHome from '../components/personalHome.vue'
import admin from '../components/admin.vue'
import store from '../store/index.js'


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/articles'
    },
    {
    	path: '/articles',
      name: 'articles',
    	component: articles
    },
    {
      path: '/articles/:id',
      component: article_detail
    },
    {
      path: '/:username/home',
      name: 'personalHome',
      component: personalHome
    },
    {
      path: '/admin',
      component: admin
    },
    // {
    // 	path: '*',
    // 	redirect: '/articles'
    // }
  ]
})

router.beforeEach((to, from, next) => {
  const nextRoute = ['personalHome'];
  if (nextRoute.indexOf(to.name) >= 0) {
    console.log("进入个人主页");
    //判断是否登录
    let temp = sessionStorage.username.toString();
    if (temp == '' || temp == 'undefined' || temp == 'null') {
      router.push({path: '/'})
      alert("请登录");
    }
  }

  if (to.path.slice(1) == 'admin' && sessionStorage.admin == 'admin') {
    console.log("进入管理员界面");
    router.app.$store.dispatch('adminLogIn')
  } 
  else if (to.path.slice(1) == 'admin' && sessionStorage.admin != 'admin'){
    console.log('notAdmin');
    router.app.$store.dispatch('adminLogOut');
    sessionStorage.admin == 'notAdmin';
    // alert("管理员未登录");
  } else {
    sessionStorage.admin == 'notAdmin';
    router.app.$store.dispatch('adminLogOut');
  }


  next();
})

export default router