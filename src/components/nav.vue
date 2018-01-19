<template>  
  <nav class="nav">
    <div class="container">
      <div class="row">
        <div class="col-sm-8 col-md-8 col-lg-8">
          <nav class="navbar navbar-default cus-nav" role="navigation">  
            <div class="container-fluid">  
              <!-- Brand and toggle get grouped for better mobile display -->  
              <div class="navbar-header">  
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">  
                  <span class="sr-only">Toggle navigation</span>  
                  <span class="icon-bar"></span>  
                  <span class="icon-bar"></span>  
                  <span class="icon-bar"></span>  
                </button>  
                <!-- <a class="navbar-brand" href="#/articles?page=1">Scy</a> -->
                <a class="navbar-brand" href="#/articles?page=1">
                  <span>Scy</span>
                  <span>Scy</span>
                  <span>Scy</span>
                  <span>Scy</span>
                  <span>Scy</span>
                  <span>Scy</span>
                </a>  
              </div>  
              <!-- Collect the nav links, forms, and other content for toggling -->  
              <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">  
                <ul class="nav navbar-nav">  
                  <li><router-link :class="{active: isArticle}" to="/articles?page=1">文章</router-link></li>
                  <li><router-link :class="{active: currentRoute=='questions'}"  to="/questions?page=1">问答</router-link></li>
                  <li><router-link :class="{active: currentRoute=='video'}"  to="/video?page=1">视频</router-link></li>
                  <li><a href="#">专栏</a></li>
                  <li><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">发现<span class="caret"></span></a>
                    <ul class="dropdown-menu">
                      <li><a href="#">技术圈</a></li>
                      <li><a href="#">开发手册</a></li>
                      <li><a href="#">广告链接</a></li>
                      <li><a href="#"></a></li>
                    </ul>
                  </li>
                </ul>
              <span @click="search" class="search-img"><input type="text" class="search" placeholder="搜索问题或关键字" @keyup.enter="search"></span>
              </div><!-- /.navbar-collapse -->  
            </div><!-- /.container-fluid -->  
          </nav>  
        </div>
        <div class="col-sm-4 col-md-4 col-lg-4">
          <div class="nav-form">
            
            <template v-if="!hasLogIn">
              <button data-toggle="modal" data-target="#modalLogin" class="btn btn-login">立即登录</button>
              <button data-toggle="modal" data-target="#modalRegister" class="btn btn-reg">免费注册</button>
            </template>

            <template v-else>
              <span class="dropdown">
                <span class="glyphicon glyphicon-pencil markdown" data-toggle="dropdown"></span>
              <ul class="dropdown-menu">
                <!-- <li><router-link to="/edit/mdEditor">写博客<span><img src="../assets/blog.png"></span></router-link></li>
                <li><router-link to="/edit/askQuestions">提问题<span><img src="../assets/ask.png"></span></router-link></li>
                <li><router-link to="/edit/leaveMessage">去留言<span><img src="../assets/message.png"></span></router-link></li> -->
                <li @click="toWrite('blog')"><span>写博客</span></li>
                <li><span>提问题</span></li>
                <li @click="toWrite('message')"><span>去留言</span></li>
              </ul>
            </span>

            <button :class="[{ btn_active: isPersonalHome}, 'btn', 'btn-home']" @click="goHome">{{ username }}</button>
              <button class="btn btn-logOut" @click="logOut">退出登录</button>
            </template>

          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <ul class="nav-label">
            <li ><a href="#/articles?page=1" data-hide="ALL">全部</a></li>
            <li><router-link to="/html/article?page=1" data-hide="HTML">html</router-link></li>
            <li><router-link to="/css/article?page=1" data-hide="CSS">css</router-link></li>
            <li><router-link to="/javascript/article?page=1" data-hide="JAVASCRIPT">javascript</router-link></li>
            <li><router-link to="/css3/article?page=1" data-hide="CSS3">css3</router-link></li>
            <li><router-link to="/html5/article?page=1" data-hide="HTML5">html5</router-link></li>
            <li><router-link to="/jquery/article?page=1" data-hide="JQUERY">jquery</router-link></li>
            <li><router-link to="/bootstrap/article?page=1" data-hide="BOOTSTRAP">bootstrap</router-link></li>
            <li><router-link to="/webpack/article?page=1" data-hide="WEBPACK">webpack</router-link></li>
            <li><router-link to="/vue/article?page=1" data-hide="VUE">vue</router-link></li>
            <li><router-link to="/react/article?page=1" data-hide="REACT">react</router-link></li>
            <li><router-link to="/nodejs/article?page=1" data-hide="NODEJS">nodejs</router-link></li>
            <li><router-link to="/mongodb/article?page=1" data-hide="MONGODB">mongodb</router-link></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 登录模态框 -->
    <scyLogin></scyLogin>
     
    <!-- 注册模态框 -->
    <scyRegister></scyRegister>
  </nav>
</template>

<script>
import $ from 'jquery'
import scyLogin from './login.vue'
import scyRegister from './register.vue'
import { mapGetters } from 'vuex'
import bus from '../bus.js'

export default {
  data () {
    return {
      currentRoute: '',
      username: ''
    }
  },
  mounted: function () {
      if (sessionStorage.username == undefined || sessionStorage.username == '' || sessionStorage.username == 'undefined')  {
        console.log(sessionStorage.username)
        console.log("未登录");
        this.$store.dispatch('logOut');
      } else {
        console.log("已登录")
        console.log(sessionStorage.username);
        this.username = sessionStorage.username;
        this.$store.dispatch('logIn');
      }
    this.currentRoute = this.$route.path.slice(1);
    console.log(this.$route);
  },
  computed: {
    ...mapGetters([
        'hasLogIn'
    ]),

    isArticle() {
      return this.$route.fullPath.indexOf('article')>-1?true:false
    },

    isPersonalHome() {
      return this.$route.name == 'personalHome'?true:false
    }
  },
  watch: {
    $route () {
      // 当前路由页
      this.currentRoute = this.$route.path.slice(1);
    }
  },
  methods: {

    // 退出登录
    logOut: function() {
      sessionStorage.username = undefined;
      sessionStorage.forbidden = false;
      this.$router.push({path: '/'});
      this.$store.dispatch('logOut');
      location.reload();
    },

    goHome: function() {
      
      this.$router.push({path: '/' + this.username + '/home', params: {username: this.username}})
    },

    search(event) {
      let val = $(event.target).val().trim();
      if (val == '') {
        return  
      } else {
        let that = this;
          $.get('http://localhost:3000/api/search', {
          key: val
         }, function(data) {
          sessionStorage.searchCache = JSON.stringify(data);
          bus.$emit('fn')
          that.$router.push('/search')

         });
        
        // $(event.target).val('');
      }
    },

    toWrite(type) {
      if (sessionStorage.forbidden == 'true') {
        alert("当前用户已被禁言")
        return 
      } else {
        console.log(type)
        switch (type) {
          case 'blog':
            this.$router.push({path: '/edit/mdEditor'})  
            break;
          case 'message':
            this.$router.push({path: '/messageBoard'})  
            break;
        }
        
      }
      
    }
  },
  components: {
    scyLogin,
    scyRegister
  }
}
</script>

<style scoped>
  nav.nav {
    border-bottom: #D7D7D7;
    box-shadow: 0 2px 5px #D7D7D7;
    min-width: 768px;
  }
  .cus-nav,
  .nav-form {
    padding: 10px 0;
    margin-bottom: 0;
    border: none;
    background-color: #FFF;
  }
  .container>.row {
    border-bottom: 1px solid #EEE;
  }
  .navbar-brand {
    width: 40px;
    height: 40px;
    margin-left: -60px;
    margin-top: -8px;
    line-height: 40px;
    font-size: 18px;
    text-align: left;
    color: #000;
    position: absolute;
    transform-origin: center;
    transform-style: preserve-3d;
    transition: transform 1s linear;
  }
  .navbar-brand:hover {
    transform: rotateX(360deg) rotateY(360deg);
  }
  .navbar-brand span {
    position: absolute;
    width: 100%;
    height: 100%;
    line-height: 40px;
  }
  .navbar-brand span:nth-child(1) {
    transform: rotateX(0deg) translateZ(20px);
    background-color: rgba(255,255,255,0.6);
  }
  .navbar-brand span:nth-child(2) {
    transform: rotateX(-90deg) translateZ(20px);
    background-color: rgba(255,255,255,255.6);
  }
  .navbar-brand span:nth-child(3) {
    transform: rotateX(-180deg) translateZ(20px);
    background-color: rgba(255,255,255,255.6);
  }
  .navbar-brand span:nth-child(4) {
    transform: rotateX(-270deg) translateZ(20px);
    background-color: rgba(255,255,255,255.6);
  }
  .navbar-brand span:nth-child(5) {
    transform: rotateX(-90deg) translateZ(20px);
    background-color: rgba(0,0,0,0.6);
  }
  .navbar-brand span:nth-child(6) {
    transform: rotateX(90deg) translateZ(20px);
    background-color: rgba(0,0,0,0.6);
  }
  ul.navbar-nav {
    font-size: 18px;
    font-weight: 550;
  }
  .nav-label {
    margin: 0;
    padding: 10px 0;
  }
  .nav-label li{
    display: inline-block;
    position: relative;
    text-align: center;
  }
  .nav-label li>a{
    display: inline-block;
    padding: 0 20px;
    color: #bbb;
    text-decoration: none;
    transition: transform 0.2s ease-in;
    transform-style: preserve-3d;
    transform-origin: top;
  }
  .nav-label li > a::after {
    content: attr(data-hide);
    display: inline-block;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 100%;
    color: #000;
    background-color: #EEE;
    transform-origin: top;
    transform: rotateX(-90deg) translateY(0px);
  }
  .nav-label li:hover a{
    transform: rotateX(90deg); 
  }
  .nav-label li:first-child a  {
    padding-left: 15px;
    color: #757575;
  }
  .search{
    position: absolute;
    right: 0;
    z-index: 3;
    margin-top: 10px;
    width: 300px;
    height: 30px;
    border: 1px solid #D7D7D7;
    border-radius: 3px;
    transition:width 0.5s;
    transform-origin: right bottom;
    text-indent: 16px;
  }
  ::-webkit-input-placeholder {
    color: #999;
  }
  :-moz-placeholder {
      color: #999;
  }
  ::-moz-placeholder {
    color: #999;
  }
  :-ms-input-placeholder {
    color: #999;
  }
  input.search:focus {
    width: 660px;
  }
  .search-img {
    cursor: pointer;
  }
  .search-img::before {
    content: url('../assets/nav_search.png');
    position: absolute;
    margin-top: 12px;
    display: inline-block;
    z-index: 99;
    right: 0;
    top: 6px;
  }
  .nav-form {
    float: right;
    margin-top: 10px;
  }
  .btn-login {
    color: #009A61;
    background-color: #FFF;
  }
  .btn-login:hover {
    background-color: #F3F3F3;
  }
  .btn-reg {
    color: #FFF;
    background-color: #009A61;
  }
  .btn-reg:hover {
    background-color:#006741
  }
  .active{
    color: #41b886 !important;
  }
  .btn_active {
    background-color: #41b886 !important;
  }
  .markdown {
    margin-right: 15px;
    cursor: pointer;
    padding: 15px 0;
  }
  .dropdown-menu li {
    cursor: pointer;
    padding: 5px 0;
  }
  .dropdown-menu li:first-child::after {
    content: url(../assets/blog.png);
  }
  .dropdown-menu li:nth-child(2)::after {
    content: url(../assets/ask.png);
  }
  .dropdown-menu li:last-child::after {
    content: url(../assets/message.png);
  }
  .dropdown-menu li::after {
    display: inline-block;
    position: relative;
    top: 2px;
    left: 10px;
  }
  .dropdown-menu li span{
    margin-left: 10px;
  }
  @media (max-width: 1200px) {
    input.search {
      width: 200px;
    }
  }
  @media (max-width: 991px) {
    input.search {
      display: none;
    }
  }
</style>
