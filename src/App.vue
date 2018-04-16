<template>
  <div id="app">
  	<cusNav v-show="!isAdmin && !isEdit"></cusNav>
    <router-view></router-view>
    <cusFooter v-show="!isAdmin && !isEdit"></cusFooter>
    <cusCopyRight v-show="!isAdmin && !isEdit"></cusCopyRight>
  </div>
</template>

<script>
import $ from 'jquery'
import cusNav from './components/nav.vue'
import cusArticles from './components/articles.vue'
import cusFooter from './components/footer.vue'
import cusCopyRight from './components/copyright.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'app',
  data: function() {
  	return {}
  },
  mounted: function() {
    // console.log(!this.isEdit && !this.isAdmin)
  },
  destoryed() {
    sessionStorage.forbidden = false
    sessionStorage.removeItem('forbidden')
  },
  watch: {
    $route (to) {
      if (to.name == 'articles') {
        this.$store.dispatch('adminLogOut');
        sessionStorage.admin = 'notAdmin'
      }
    }
  },
  computed: {
    ...mapGetters([
      'isAdmin',
      'isEdit'
    ])
  },
  components: {
  	cusNav,
    cusArticles,
    cusFooter,
    cusCopyRight
  }
}
</script>

<style>
/*全局样式*/


/*新标签添加按钮样式*/
.name {
  max-width: 256px;
  display: inline-block;
  padding: 3px 8px;
  margin-right: 25px;
  background-color: #efefef;
}
/*.name::after {
  content: url(./assets/cancle.png);
  position: absolute;
  display: inline-block;
  top: 23px;
  margin-left: 5px;
}*/
span:focus {
  outline: none;
}

/*防止图片过大，溢出屏幕*/
.article-body img,
#adminCheckArticleModal .modal-body img {
  max-width: 100%;
}

.text-center {
  text-align: center;
}
</style>
