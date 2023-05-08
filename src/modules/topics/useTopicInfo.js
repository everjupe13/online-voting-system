import { ref } from 'vue'
import useAppFetch from '@/modules/http/useAppFetch.js'
import { useStore } from 'vuex'

const createService = async ({ id }) => {

  const store = useStore()
  const topics = await store.dispatch('topics/getAllTopics')

  const { data, isFetching } = await useAppFetch(`topics/search/${id}`)
    .get()
    .json()

  if (!data.value.status) {
    return false
  }
  
  return {
    topic: data.value.topic || {},
  }
}

const useService = (...args) => {
  return createService(...args)
}

export { useService as useTopicInfo }
