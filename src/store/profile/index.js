import useAppFetch from "../../modules/http/useAppFetch"
import dayjs from "dayjs"
import customFormatDate from 'dayjs/plugin/customParseFormat'

dayjs.extend(customFormatDate)

const store = {
  namespaced: true,

  state() {
    return {
      profileInfo: {},
    }
  },

  getters: {
    getProfile(state) {
      return state.profileInfo
    }
  },

  mutations: {
    setProfile(state, profile) {
      state.profileInfo = profile
    }
  },

  actions: {
    async fetchProfile({commit}) {
      const { isFetching, error, data } = await useAppFetch('profile/show').post().json()

      if (!data.value?.status) {
        console.log('error')
        return false
      }

      const profile = data.value?.profile
      commit('setProfile', profile)
      return profile
    },

    async update({commit}, { name, bio }) {
      const { isFetching, error, data } = await useAppFetch(`profile/index`)
        .post({ name, bio })
        .json()

      if (!data.value?.status) {
        console.log(error)
        return false
      }

      const profile = data.value?.profile
      commit('setProfile', profile)
    }
  }
}

export { store as profile }
