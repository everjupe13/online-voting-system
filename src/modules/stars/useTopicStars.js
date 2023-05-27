import { ref, unref, toRef, watchEffect } from 'vue'
import useAppFetch from '@/modules/http/useAppFetch.js'
// import { useStore } from 'vuex'

const createService = async ({ id }) => {

  const stars = ref()
  const fetcher = async () => {
    const { data, isFetching } = await useAppFetch(`stars/topic/search/${id}`)
      .post()
      .json()

    if (!data.value.status) {
      stars.value = {}
      return
    }

    stars.value = data.value.stars
    return
  }

  await fetcher()

  return {
    stars,
    refetch: fetcher
  }
}

const useService = (...args) => {
  return createService(...args)
}

export { useService as useTopicStars }
