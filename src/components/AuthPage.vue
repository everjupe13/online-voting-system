<script setup>
import AppButton from './AppButton.vue';
import AppTextInput from './AppTextInput.vue'

import { ref, reactive } from 'vue'
// import { useAuth } from '../api/auth/useAuth'

const AUTH_TYPES = {
  LOGIN: 'login',
  SIGNUP: 'signup'
}

const currentFormType = ref('login')

const toggleFormType = (type) => {
  currentFormType.value = type
}

// const auth = useAuth()
// console.log(auth)


const userFormData = reactive({
  signin: {
    username: '',
    password: ''
  },
  signup: {
    username: '',
    password: ''
  }
})

</script>

<template>
  <section class="page">
    <div class="page__wrapper">
      <div class="auth__wrapper">

        <header class="page__header auth__header">
          <h1 :class="['title', 'auth__title', { '--unactive': currentFormType !== AUTH_TYPES.LOGIN }]"
            @click="toggleFormType(AUTH_TYPES.LOGIN)">
            Login
          </h1>
          <h1 :class="['title', 'auth__title', { '--unactive': currentFormType !== AUTH_TYPES.SIGNUP }]"
            @click="toggleFormType(AUTH_TYPES.SIGNUP)">
            Sign Up
          </h1>
        </header>

        <div class="page__content">
          <transition name="slide-up">
            <keep-alive v-if="currentFormType === AUTH_TYPES.LOGIN">
              <form @submit.prevent class="form auth__form">
                <div class="form__inputs">
                  <AppTextInput :value="userFormData.signin.username" @input="v => userFormData.signin.username = v" class="auth__input" :input-type="'text'" :label="'login'" :label-binding-id="'auth-login'" />
                  <AppTextInput :value="userFormData.signin.password" @input="v => userFormData.signin.password = v" class="auth__input" :input-type="'password'" :label="'password'"
                    :label-binding-id="'auth-password'" />
                </div>
                <AppButton type="submit">Procced</AppButton>
              </form>
            </keep-alive>
            <keep-alive v-else-if="currentFormType === AUTH_TYPES.SIGNUP">
              <form @submit.prevent class="form auth__form">
                <div class="form__inputs">
                  <AppTextInput :value="userFormData.signup.username" @input="v => userFormData.signup.username = v" class="auth__input" :input-type="'text'" :label="'login'" :label-binding-id="'auth-login'" />
                  <AppTextInput :value="userFormData.signup.password" @input="v => userFormData.signup.password = v" class="auth__input" :input-type="'password'" :label="'password'"
                    :label-binding-id="'auth-password'" />
                </div>
                <AppButton type="submit">Procced</AppButton>
              </form>
            </keep-alive>
          </transition>
          
        </div>

      </div>
    </div>
  </section>
</template>

<style lang="scss">
.auth {

  &__wrapper {
    max-width: 500px;
    margin: 0 auto;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    margin-bottom: 80px;
  }

  &__title {

    transition: all .3s;
    user-select: none;
    cursor: auto;

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
