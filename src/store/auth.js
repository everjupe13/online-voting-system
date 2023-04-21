const store = {
  state() {
    return {
      token: null,
      user: null,
      isAuth: false
    }
  },
  getters: {
    setToken(state, token) {
      state.token = token;
    },
    setUser(state, user) {
      state.user = user;
    },
  },
  mutations: {
    setTheme(state, themeId) {
      state.theme = themeId
    }
  },
  actions: {
    async signin(_, {email, password}) {

    },
    async login({ commit }, { email, password }) {

    }
  }
}

export { store as auth }
