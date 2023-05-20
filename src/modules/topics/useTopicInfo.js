import { ref, unref, toRef, watchEffect } from 'vue'
import useAppFetch from '@/modules/http/useAppFetch.js'
// import { useStore } from 'vuex'

const createService = async ({ id }) => {

  const topic = ref({})
  const fetcher = async () => {
    const { data, isFetching } = await useAppFetch(`topics/search/${id}`)
      .get()
      .json()

    if (!data.value.status) {
      topic.value = {}
      return 
    }

    topic.value = { ...data.value.topic }
    return
  }

  await fetcher()
  
  return {
    topic,
    refetch: fetcher
  }
}

const useService = (...args) => {
  return createService(...args)
}

export { useService as useTopicInfo }
