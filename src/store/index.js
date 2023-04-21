import { createStore } from "vuex"
import { auth } from './auth'

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
    auth
  }
})

export default store