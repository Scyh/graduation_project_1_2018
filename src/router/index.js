import Vue from 'vue'
import Router from 'vue-router'
import app from '../App.vue'
import articles from '../components/articles.vue'
import article_detail from '../components/article_detail.vue'
import question from '../components/question.vue'
import edit from '../components/edit.vue'
import personalHome from '../components/personalHome.vue'
import publicHome from '../components/publicHome.vue'
import announcement from '../components/announcement.vue'
import admin from '../components/admin.vue'
import store from '../store/index.js'
import adminUserInfo from '../components/admin_User_Manage.vue'

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
    	component: articles,
    },
    {
      path: '/search',
      component: articles
    },
    {
      path: '/articles/:id',
      component: article_detail
    },
    {
      path: '/:category/article',
      component: articles
    },
    {
      path: '/:category/article/:id',
      component: article_detail
    },
    {
      path: '/:username/home',
      name: 'personalHome',
      component: personalHome
    },
    {
      path: '/:username/publicHome',
      component: publicHome
    },
    {
      path: '/admin',
      component: admin
    },
    {
      path: '/questions',
      component: question
    },
    // 查看自己或者别人的主页
    {
      path: '/:username/articles/:id',
      // component: personalArticleDetail
      component: article_detail
    },
    // 通过类别查看文章
    {
      path: '/:category/:username/articles/:id'
    },
    {
      path: '/edit/:class',
      component: edit
    },
    {
      path: '/announcement',
      component: announcement
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
    // console.log("进入个人主页");
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
  //   else if (to.path.slice(1) == 'admin' && sessionStorage.admin != 'admin'){
  //   console.log('notAdmin');
  //   router.app.$store.dispatch('adminLogOut');
  //   sessionStorage.admin == 'notAdmin';
  //   alert("管理员未登录");
  // } else {
  //   sessionStorage.admin == 'notAdmin';
  //   router.app.$store.dispatch('adminLogOut');
  // }


  next();
})

export default router