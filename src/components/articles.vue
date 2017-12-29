<template>
	<div class="section2">
		<div class="container">
			<div class="row">
				<div class="col-md-8 col-lg-8">
					<main>
						<template v-for="(article, index) in articles">
							<article>
								<div class="row">
								<!-- <div class="article_img col-md-5">
									<img class="img-responsive" src="../assets/img1.png" />
								</div> -->
								<div class="col-md-12">
									<h4 class="article_title"><router-link :to="{path:'articles/' + article._id}" >{{ article.article_title }}</router-link></h4>
									<p class="article_content" :id="'content' + index" v-html="article.article_content.slice(0,100)"></p>
								</div>
								<div class="article_publish_date">{{ article.article_publish_date | getDate}}</div>
								<div class="article_pv">{{ article.article_pv }}</div>
							</div>
							</article>
						</template>

						<nav aria-label="Page navigation" v-show='!isSearch'>
						  <ul class="pagination">
						    <li>
						      <a href="javascript:void(0)" aria-label="Previous" @click="prevOrNext('prev')">
						        <span aria-hidden="true">&laquo;</span>
						      </a>
						    </li>
						    <li v-for="(index) in pages" :class="{active: currentPage == index}" @click="pageChange(index)" >
						    	<router-link :to="{path: currentCategory?'/' + currentCategory + '/articles':'/articles', query: { page: index }}">{{index}}</router-link>
						    </li>
						    <li>
						      <a href="javascript:void(0)" aria-label="Next" @click="prevOrNext('next')">
						        <span aria-hidden="true">&raquo;</span>
						      </a>
						    </li>
						  </ul>
						</nav>

					</main>
				</div>
				<div class="col-md-4 col-lg-4">
					<index-aside></index-aside>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import $ from 'jquery'
import bus from '../bus.js'
import { mapGetters } from 'vuex'
import indexAside from '../components/indexAside.vue'

export default {
	data: function() {
		return {
			articles: [],
			pageCount: 0,
			currentPage: 1,
			showItem: 5,
		}
	},
	created: function () {
		let that = this;
		// bus.$on('fn', function (data) {
		// 		that.articles = [];
		// 		for (let i in data) {
		// 			that.articles.push(data[i])
		// 		}
		// 		// data.forEach((i) => {
		// 		// 	this.articles.push(data[i])
		// 		// })
		// 	})
	},
	beforeMount: function () {
      window.scroll(0,0)
  	},
	mounted: function() {
		let that = this;

		bus.$on('fn', function (data) {
			that.updateArticle();
		})	
		if (this.$route.path == '/search') {
			that.updateArticle()
		} else {

			if (this.$route.path == '/articles' && !this.$route.query.page) {
				this.$router.replace({path: 'articles', query: {page: 1}})
			}
			this.initPagination();
			this.initArticles();

			if (this.$route.query.page != undefined) {
				this.pageChange(this.$route.query.page);
			}
		}
	},
	updated(data) {

		// this.articles.forEach((item, index)=> {
		// 	// i.article_content = ''
		// 	let el = '#content' + index;
			
		// 	// item.article_content = $(el).html($(el).html()).slice(0,100)

		// })
		
		// console.log($(".article-content").text())
		// $(".article_content").html($(".article_content").text())
	},
	computed:{
		pages: function(){
            var pag = [];
              if( this.currentPage < this.showItem ){ 
                   var i = Math.min(this.showItem,this.pageCount);
                   while(i){
                       pag.unshift(i--);
                   }
               }else{
                   var middle = this.currentPage - Math.floor(this.showItem / 2 ),
                       i = this.showItem;
                   if(middle >  (this.pageCount - this.showItem)){
                       middle = (this.pageCount - this.showItem) + 1
                   }
                   while(i--){
                       pag.push( middle++ );
                   }
               }
             return pag
        },

        currentCategory: function () {
        	return this.$route.params.category?this.$route.params.category:false
        },

        ...mapGetters([
        	'isSearch'
        ])

	},
	watch: {
		$route() {
			if (this.$route.path == '/search') {
				console.log("search")
				this.$store.dispatch('isSearch');
				if (sessionStorage.searchCache){
					this.articles = [];
					let temp = JSON.parse(sessionStorage.searchCache);
					for(let i in temp) {
						this.articles.push(temp[i])
					}
				}				
			} else {
				this.initPagination();
				this.initArticles();
				this.pageChange(this.$route.query.page);
				this.$store.dispatch('notSearch');
			}
		},
	},
	methods: {

		// 初始化文章
		initArticles: function () {
			let that = this;
			$.get('http://localhost:3000/api/getArticle', {
				pageCount: 1,
				category: that.$route.params.category?that.$route.params.category:'all'
			}, function(data) {
					data.forEach((item,index) => {
					that.articles.push(item);
				})

			});
		},// initArticles 结束

		// 初始化分页
		initPagination: function () {
			let that = this;
			$.get('http://localhost:3000/api/getPageCount', {
				category: that.$route.params.category?that.$route.params.category:'all'
			}, function(data) {
				that.pageCount = Math.ceil(data*1 / that.showItem);
			});
		}, // initPagination 结束

		// 分页跳转
		pageChange: function (index) {
			let that = this;
			that.currentPage = index;
			$.get('http://localhost:3000/api/getArticle', {
				pageCount: that.currentPage,
				category: that.$route.params.category?that.$route.params.category:'all'
			}, function(data) {
				
				// window.scroll(0,0)
				// console.log(data)
				data.forEach((item, index) => {
					// console.log(item.article_content)
					item.article_content = that.html(item.article_content)
				})

				that.articles = data;
			});

		},// pageChange 改变

		prevOrNext: function (type) {
			let that = this;
			if (type == 'prev') {
				
				// 向前翻页
				if (this.currentPage > 1) {
					this.currentPage --;
					this.pageChange(this.currentPage)
				} else {
					return 
				}

			} else if (type == 'next') {
				// 向后翻页
				console.log(this.currentPage)
				// console.log(this.pages[4])
				console.log(this.pages)
				if (this.currentPage < this.pages[3]) {
					this.currentPage ++;
					this.pageChange(this.currentPage)
				} else {
					return 
				}
			}
		},//prevOrNext结束

		updateArticle: function () {
			if (sessionStorage.searchCache){
				this.articles = [];
				let temp = JSON.parse(sessionStorage.searchCache);
				for(let i in temp) {
					this.articles.push(temp[i])
					}
			}
		},

		html(val) {
			let el = document.createElement('span')
			$(el).html(val);
			return $(el).text()
		}
	},
	components: {
		indexAside
	}
}
</script>

<style scoped>
	* {
		transition: all 0.5s ease; 
	}
	.section2 {
		padding: 15px;
		background: url(../assets/bj.png) repeat;
	}
	h4 {
		margin-top: 0;
	}
	article {
		margin-bottom: 15px;
		padding: 30px;
		display: flex;
		background-color: #FFF;
		position: relative;
	}
	article::before {
		content: '';
		position: relative;
		left: -30px;
		display: inline-block;
		width: 10px;
		height: 30px;
		background-color: #009A61;
	}
	.article_img {
		overflow: hidden;
	}
	.article_img img:hover {
		transform: scale(1.4);
	}
	.article_content {
		color: #969696;
	}
	.article_publish_date,
	.article_pv {
		position: absolute;
		bottom: 15px;
		right: 15px;
		color: #C5C5C5;
	}
	.article_pv {
		right: 170px;
	}
	.article_pv::before {
		content: url('../assets/article_pv.svg');
		display: inline-block;
		position: relative;
		left: 0px;
		top: 11px;
		margin-right: 3px;
	}
</style>