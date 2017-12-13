import Vue from 'vue'
import Router from 'vue-router'
import app from '../App.vue'
import articles from '../components/articles.vue'
import article_detail from '../components/article_detail.vue'
import personalHome from '../components/personalHome.vue'
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
  next();
})

export default router