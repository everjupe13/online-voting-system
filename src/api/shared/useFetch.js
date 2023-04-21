import { ref, onMounted, onUnmounted, isRef } from 'vue'

const abortError = 'AbortError'

const isContentTypeJson = (res) => {
  const contentType = res.headers.get('content-type')
  return contentType && contentType.includes('application/json')
}

const getUrl = (url) => (isRef(url) ? url.value : url)

const fetchWrapper = async (url, opts) => {
  const res = await fetch(getUrl(url), opts)
  const resData = isContentTypeJson(res) && (await res.json())
  return { 
    resData,
    res
  }
}

export function useFetch(
  url,
  options = {},
  runOnMount = true
) {
  const data = ref(null)
  const status = ref(null)
  const statusText = ref(null)
  const isLoading = ref(false)
  const isFailed = ref(false)
  const isAborted = ref(false)

  let controller

  const start = async () => {
    try {
      controller = new AbortController()
      const signal = controller.signal

      isLoading.value = true
      isFailed.value = false
      isAborted.value = false

      const { resData, res } = await fetchWrapper(getUrl(url), {
        signal,
        ...options
      })
      data.value = resData

      isLoading.value = false
      isFailed.value = !res.ok
      status.value = res.status
      statusText.value = res.statusText
    } catch (err) {
      if (err.name === abortError) isAborted.value = true
      isLoading.value = false
      isFailed.value = true
      status.value = 500
      statusText.value = err.message || err.name
    }
  }

  const stop = () => {
    if (controller) controller.abort()
  }

  onMounted(() => runOnMount && start())
  onUnmounted(stop)

  return {
    data,
    status,
    statusText,
    isLoading,
    isFailed,
    isAborted,
    start,
    stop
  }
}


// // fetch.js
// import { ref, isRef, unref, watchEffect } from 'vue'

// export function useFetch(url) {
//   const data = ref(null)
//   const error = ref(null)

//   function doFetch() {
//     // reset state before fetching..
//     data.value = null
//     error.value = null
//     // unref() unwraps potential refs
//     fetch(unref(url))
//       .then((res) => res.json())
//       .then((json) => (data.value = json))
//       .catch((err) => (error.value = err))
//   }

//   if (isRef(url)) {
//     // setup reactive re-fetch if input URL is a ref
//     watchEffect(doFetch)
//   } else {
//     // otherwise, just fetch once
//     // and avoid the overhead of a watcher
//     doFetch()
//   }

//   return { data, error }
// }