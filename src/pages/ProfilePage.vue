<script setup>
import AppTextInput from '@/components/AppTextInput.vue'
import AppButton from '@/components/AppButton.vue'
import { reactive, watchEffect, ref } from 'vue'
import { useStore } from 'vuex'
import useAppFetch from '@/modules/http/useAppFetch.js'

const store = useStore()
const profile = ref({})

watchEffect(() => { profile.value = store.getters['auth/profile/getProfile'] })

const profileForm = reactive({
  bio: profile.value.bio,
  name: profile.value.name
})

const onProfileUpdate = () => {
  store.dispatch('auth/profile/update', { 
    name: profileForm.name,
    bio: profileForm.bio,
  })

  profileForm.name = profileForm.bio = ''
}

const onChangeProfile = async () => {
  return
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

        <div class="page__content-block">
          <!-- <h4 class="headings-text">Create your topic</h4> -->
          <h4 class="headings-text">Change your info</h4>
        </div>

        <div class="page__content-block">
          <!-- <form @submit.prevent="onCreateTopic" class="form auth__form">
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
          </form> -->
          <form @submit.prevent="onProfileUpdate" class="form auth__form">
            <div class="form__inputs">
              <AppTextInput 
                :value="profileForm.name"
                :label-binding-id="'your-name'"
                :input-type="'text'"
                :label="'name'"
                class="auth__input"
                @input="v => profileForm.name = v"
              />
              <AppTextInput 
                :value="profileForm.bio"
                :label-binding-id="'your-bio'"
                :input-type="'text'"
                :label="'bio'"
                class="auth__input"
                @input="v => profileForm.bio = v" 
              />
            </div>
            <AppButton type="submit">Update</AppButton>
          </form>
        </div>

        <div class="page__content-block">
          <p class="commont-text">name: {{ profile.name }}</p>
          <p class="commont-text">bio: {{ profile.bio }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
</style>
