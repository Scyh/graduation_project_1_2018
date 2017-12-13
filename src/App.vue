<template>
  <div id="app">
  	<cusNav></cusNav>
    <router-view></router-view>
    <cusFooter></cusFooter>
    <cusCopyRight></cusCopyRight>
  </div>
</template>

<script>
import $ from 'jquery'
import cusNav from './components/nav.vue'
import cusArticles from './components/articles.vue'
import cusFooter from './components/footer.vue'
import cusCopyRight from './components/copyright.vue'

export default {
  name: 'app',
  data: function() {
  	return {}
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
