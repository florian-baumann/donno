import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    isNewUser: true
  },
  mutations: {
    SET_USER_DATA (state, userData) {
      state.user = userData
      localStorage.setItem('user', JSON.stringify(userData))
      axios.defaults.headers.common['x-access-token'] = `${userData.accessToken}`
    },
    LOGOUT () {
      localStorage.removeItem('user')
      location.reload()
    },
    IS_NEW_USER (state, isNewUser) {
      state.isNewUser = isNewUser
    }
  },
  actions: {
    register ({ commit }, credentials) {
      return axios
        .post(process.env.VUE_APP_API_URL + '/auth/signup', credentials)
        .then(({ data }) => {
          console.log("data is: ", data)
          commit('SET_USER_DATA', data)
        })
    },
    login ({ commit }, credentials) {
      return axios
        .post(process.env.VUE_APP_API_URL +'/auth/signin', credentials)
        .then(({ data }) => {
          commit('SET_USER_DATA', data)
        })
    },
    logout ({ commit }) {
      commit('LOGOUT')
    },
    isNewUser ({ commit }, isNewUser) {
      commit('IS_NEW_USER', isNewUser)
    }
  }
})