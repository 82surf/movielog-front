import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    // paths 내부의 값만 localStorage에 저장
    paths: ['username'],
  })],
  state: {
    username: '',
    movieData: null,
  },
  mutations: {
    GET_USERNAME: function(state, username){
      state.username = username
    },
    SELECT_MOVIE: function(state, movie){
      state.movieData = movie
    }
  },
  actions: {
    getUsername: function({ commit }, username){
      commit('GET_USERNAME', username)
    },
    selectMovie: function({ commit }, movie){
      commit('SELECT_MOVIE', movie)
    }
  },
  modules: {
  }
})
