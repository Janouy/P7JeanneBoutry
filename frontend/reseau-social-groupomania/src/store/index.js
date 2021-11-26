import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    updatedLikes: 0,
  },
  mutations: {
    INCREMENT_LIKE(state, payload){
      state.updatedLikes += Number(payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
