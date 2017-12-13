import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
	login: false
}

const getters = {
	hasLogIn: state => state.login
}

const actions = {
	logIn: ({ commit }) => {
		commit('logIn')
	},

	logOut: ({ commit }) => {
		commit('logOut')
	}
}

const mutations = {
	logIn(state) {
		state.login = true
	},
	logOut(state) {
		state.login = false
	}
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations
})