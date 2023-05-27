import useAppFetch from '../modules/http/useAppFetch'
import jwtDecode from 'jwt-decode'
export const TOKEN_STORAGE_KEY = 'x-token'
export const USER_STORAGE_KEY = 'x-user'

import { profile } from './profile'

const store = {
  namespaced: true,

  state() {
    return {
      token: null,
      user: null
    }
  },

  getters: {
    isAuth(state) {
      return !!state.token
    },

    getToken(state) {
      return state.token
    }
  },

  mutations: {
    setToken(state, token) {
      state.token = token
    },

    setUser(state, user) {
      state.user = user
    }
  },

  actions: {
    async signup({ commit }, { email, password }) {
      const { isFetching, error, data } = await useAppFetch('auth/signup')
        .post({
          email,
          password
        })
        .json()

      const { status, token } = data.value
      if (status) {
        commit('setToken', token)
        localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(token))

        return true
      }
      return false
    },

    async login({ commit }, { email, password }) {
      const { isFetching, error, data } = await useAppFetch('auth/signin')
        .post({
          email,
          password
        })
        .json()

      const { status, token, user } = data.value
      if (status) {
        commit('setToken', token)
        commit('setUser', user)

        localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(token))
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
        
        return true
      }
      return false
    },

    logout({ commit }) {
      localStorage.removeItem(TOKEN_STORAGE_KEY)
      localStorage.removeItem(USER_STORAGE_KEY)
      commit('setToken', null)
      commit('setUser', null)
    },

    async setupUserSession({ commit, dispatch }) {
      const localToken = localStorage.getItem(TOKEN_STORAGE_KEY) !== 'undefined'
        ? JSON.parse(localStorage.getItem(TOKEN_STORAGE_KEY))
        : null

      if (localToken && (typeof localToken === 'string' || localToken instanceof String)) {
        // const userId = jwtDecode(localToken.value)
        // commit('setUser', { id: userId })
        commit('setToken', localToken)

        const { isFetching, error, data } = await useAppFetch('user/show').post().json()
        const { status, user } = data.value
        if (status) {
          commit('setUser', user)
          localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
          dispatch('profile/fetchProfile')
          return true
        }
      }

      return false
    }
  },

  modules: {
    profile
  }
}

export { store as auth }
