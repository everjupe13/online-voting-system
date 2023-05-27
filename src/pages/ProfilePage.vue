<script setup>
import AppTextInput from '@/components/AppTextInput.vue'
import AppButton from '@/components/AppButton.vue'
import { reactive, watchEffect, ref } from 'vue'
import { useStore } from 'vuex'

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
</script>

<template>
  <section class="page">
    <div class="page__wrapper">
      <div class="page__content">

        <header class="page__header">
          <h1 class="title">Profile</h1>
        </header>

        <div class="page__content-block">
          <h4 class="headings-text">Your data:</h4>
        </div>

        <div class="page__content-block">
          <p class="commont-text profile__info"><b>name</b>: {{ profile.name }}</p>
          <p class="commont-text profile__info"><b>bio</b>: {{ profile.bio }}</p>
        </div>

        <div class="page__content-block">
          <h4 class="headings-text">Change your info</h4>
        </div>

        <div class="page__content-block">
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

       
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.profile {

  &__info {
    font-size: 18px;
    margin-bottom: 3px;
  }
}
</style>
