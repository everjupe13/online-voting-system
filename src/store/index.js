import { createStore } from "vuex"
import { auth } from './auth'
import { topics } from './topics'

const store = createStore({
  state() {
    return {
      theme: null
    }
  },
  getters: {
    getTheme(state) {
      return state.theme
    }
  },
  mutations: {
    setTheme (state, themeId) {
      state.theme = themeId
    }
  },
  modules: {
    auth,
    topics
  }
})

export default store
