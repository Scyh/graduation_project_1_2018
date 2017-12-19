<template>
  <div id="app">
  	<cusNav v-show="!isAdmin"></cusNav>
    <router-view></router-view>
    <cusFooter v-show="!isAdmin"></cusFooter>
    <cusCopyRight v-show="!isAdmin"></cusCopyRight>
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
    // console.log(this.isAdmin);
    sessionStorage.admin = 'notAdmin'
  },
  watch: {
    $route (to) {
      
    }
  },
  computed: {
    ...mapGetters([
      'isAdmin'
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
</style>
