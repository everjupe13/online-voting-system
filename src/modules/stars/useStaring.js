import { ref, unref, toRef, watchEffect } from 'vue'
import useAppFetch from '@/modules/http/useAppFetch.js'
// import { useStore } from 'vuex'

const createService = async ({ id }) => {

  const stared = ref({})
  const fetcher = async () => {
    const { data, isFetching } = await useAppFetch(`stars/topic/${id}`)
      .post({ isStared: true })
      .json()

    if (!data.value.status) {
      star.value = {}
      return 
    }

    stared.value = { ...data.value.stared }

    return
  }

  await fetcher()
  
  return {
    stared,
    refetch: fetcher
  }
}

const useService = (...args) => {
  return createService(...args)
}

export { useService as useStaring }
