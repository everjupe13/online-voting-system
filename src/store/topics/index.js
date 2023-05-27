import useAppFetch from "../../modules/http/useAppFetch"
import dayjs from "dayjs"
import customFormatDate from 'dayjs/plugin/customParseFormat'

dayjs.extend(customFormatDate)

const store = {
  namespaced: true,

  state() {
    return {
      topics: [],
      currentTopic: {}
    }
  },

  actions: {
    async getAllTopics() {
      const { isFetching, error, data } = await useAppFetch('topics/search').get().json()

      if (!data.value?.status) {
        console.log('error')
        return false
      }

      const topics = data.value?.topics.map(topic => ({...topic, createdAt: dayjs(topic.createdAt).format('DD MMMM YYYY')}))
      return topics
    },

    async updateUserVote({}, { topicId, voteResult }) {
      const { isFetching, error, data } = await useAppFetch(`vote/topic/${topicId}`)
        .post({ voteResult })
        .json()

      if (!data.value?.status) {
        console.log(error)
        return false
      }

      const voted = data.value?.voted
      return voted
    }
  }
}

export { store as topics }
