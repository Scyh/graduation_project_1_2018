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
</style>
