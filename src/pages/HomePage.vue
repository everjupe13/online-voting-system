<script setup>
import AppButton from '@/components/AppButton.vue'
import AppTextInput from '@/components/AppTextInput.vue'
import TopicCard from '@/components/TopicCard.vue'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import useAppFetch from '../modules/http/useAppFetch'


const store = useStore()
const router = useRouter()
const currentScreen = ref('show')

const topics = await store.dispatch('topics/getAllTopics')

const SCREENS = {
  SHOW: 'show',
  CREATE: 'create'
}

const toggleScreen = (type) => {
  if (type === SCREENS.CREATE && !store.getters['auth/isAuth']) {
    router.push('/auth')
    return currentScreen.value = SCREENS.SHOW
  }
  
  return currentScreen.value = type
}


const topicData = reactive({
  name: '',
  description: ''
})

const onCreateTopic = async () => {
  const { isFetching, data } = await useAppFetch('topics/create')
    .post({
      name: topicData.name,
      description: topicData.description
    })
    .json()

  if (!data.value.status) {
    console.error('onTopicCreate error', data.value.description)
    return false
  }

  topicData.name = topicData.description = ''
  return true
}

</script>

<template>
  <section class="page">
    <div class="page__wrapper">
      <div class="page__content">

        <header class="page__header screens-tabs__header">
          <h1 :class="['title', 'screens-tabs__title', { '--unactive': currentScreen !== SCREENS.SHOW }]"
            @click="toggleScreen(SCREENS.SHOW)">
            Recent topics
          </h1>
          <h1 :class="['title', 'screens-tabs__title', { '--unactive': currentScreen !== SCREENS.CREATE }]"
            @click="toggleScreen(SCREENS.CREATE)">
            Create Topic
          </h1>
        </header>

        <div class="page__body">

          <div class="page__content-block">
            <transition name="slide-up">
              <keep-alive v-if="currentScreen === SCREENS.SHOW">
                <div>
                  <div class="page__content-block">
                    <h4 class="headings-text">Online voting realtime</h4>
                  </div>

                  <div class="page__content-block">
                    <div 
                      v-if="topics.length"
                      v-for="(topic, index) in topics"
                      :key='`${topic.id}`'
                      class="page__content-block"
                    >
                      <TopicCard :topic-data="topic" />
                    </div>
                  </div>
                </div>
              </keep-alive>
              <keep-alive v-else-if="currentScreen === SCREENS.CREATE">
                <div>
                  <div class="page__content-block">
                    <h4 class="headings-text">To create the topic fill the form bellow:</h4>
                  </div>
                  <form @submit.prevent="onCreateTopic" class="form auth__form">
                    <div class="form__inputs">
                      <AppTextInput 
                        :value="topicData.name"
                        :label-binding-id="'name'"
                        :input-type="'text'"
                        :label="'name'"
                        class="auth__input"
                        @input="v => topicData.name = v"
                      />
                      <AppTextInput 
                        :value="topicData.description"
                        :label-binding-id="'description'"
                        :input-type="'text'"
                        :label="'description'"
                        class="auth__input"
                        @input="v => topicData.description = v" 
                      />
                    </div>
                    <AppButton type="submit">Create topic</AppButton>
                  </form>
                </div>
              </keep-alive>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.page {
  &__content {
    display: flex;
    flex-direction: column;

    height: 100%;
  }

  &__header {
    flex: 0 0 auto;
  }

  &__body {
    flex: 1 1 auto
  }
}

.screens-tabs {

  &__wrapper {
    max-width: 500px;
    margin: 0 auto;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  &__title {

    transition: all .3s;
    user-select: none;
    cursor: pointer;

    &.--unactive {
      transform: scale(0.75);
      opacity: 0.5;

      &:hover {
        transform: scale(0.9);
        opacity: 0.7
      }
    }
  }

  &__input {
    width: 100%;
    max-width: 500px;
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}



.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.2s ease-out;
  width: 100%;
}

.slide-up-enter-active {
  transition-delay: 0.25s;
}

.slide-up-leave-active {
  position: absolute;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(50px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
