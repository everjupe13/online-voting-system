import { createFetch } from "@vueuse/core"
import { ENV } from '@/configs/env.js'
import { isReactive, reactive } from "vue"
import store from '@/store/index.js'

const useAppFetch = (...args) => {
  const refStore = !isReactive(store) ? reactive(store) : store

  const interceptors = {
    async beforeFetch({ options }) {
      const token = refStore.getters['auth/getToken']
      if (token !== null) {
        options.headers.Authorization = `Bearer ${token}`
      }

      return { options }
    }
  }

  const useAppFetchFn = createFetch({
    baseUrl: ENV.API_URL,
    options: interceptors,
    fetchOptions: {
      mode: 'cors',
    }
  })

  return useAppFetchFn(...args)
}

export default useAppFetch
