<script setup>
import AppTextInput from '@/components/AppTextInput.vue'
import AppButton from '@/components/AppButton.vue'
import { reactive } from 'vue'
import { useStore } from 'vuex'
import useAppFetch from '@/modules/http/useAppFetch.js'

const store = useStore()
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
  console.log(data.value.topic)
  return true
}
</script>

<template>
  <section class="page">
    <div class="page__wrapper">

      <div class="page__content">

        <header class="page__header">
          <h1 class="title">Profile</h1>
        </header>

        <div class="page__content">
          <h4 style="margin-bottom: 20px">Create your topic:</h4>

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
            <AppButton type="submit">Create</AppButton>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">

</style>
