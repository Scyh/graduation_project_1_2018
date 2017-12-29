import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
	login: false,	// 是否登录
	admin: false,	// 是否是管理员登录
	search: false,  // 是否在搜索文章
	edit: false, // 是否 编辑
}

const getters = {
	hasLogIn: state => state.login,
	isAdmin: state => state.admin,
	isSearch: state => state.search,
	isEdit: state => state.edit,
}

const actions = {
	logIn: ({ commit }) => {
		commit('logIn');
	},
	logOut: ({ commit }) => {
		commit('logOut');
	},

	adminLogIn: ({ commit }) => {
		commit('adminLogIn');
	},
	adminLogOut: ({ commit }) => {
		commit('adminLogOut');
	},

	isSearch: ({ commit }) => {
		commit('isSearch');
	},
	notSearch: ({ commit }) => {
		commit('notSearch');
	},

	isEdit: ({ commit }) => {
		commit('isEdit');
	},
	notEdit: ({ commit }) => {
		commit('notEdit');
	}
}

const mutations = {
	logIn(state) {
		state.login = true
	},
	logOut(state) {
		state.login = false
	},
	adminLogIn(state) {
		state.admin = true
	},
	adminLogOut(state) {
		state.admin = false
	},
	isSearch(state) {
		state.search = true
	},
	notSearch(state) {
		state.search = false
	},
	isEdit(state) {
		state.edit = true
	},
	notEdit(state) {
		state.edit = false
	}
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations
})