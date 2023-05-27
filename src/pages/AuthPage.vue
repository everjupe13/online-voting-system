<script setup>
import AppButton from '@/components/AppButton.vue'
import AppTextInput from '@/components/AppTextInput.vue'
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const AUTH_TYPES = {
  LOGIN: 'login',
  SIGNUP: 'signup'
}

const store = useStore()
const router = useRouter()
const currentFormType = ref('login')

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

const toggleFormType = (type) => {
  currentFormType.value = type
}

const handleLogin = async () => {
  const result = await store.dispatch('auth/login', { 
    email: userFormData.signin.username,
    password: userFormData.signin.password
  })
  if (result) {
    await router.push('/')
  }
}

const handleSignup = async () => {
  const result = await store.dispatch('auth/signup', { 
    email: userFormData.signup.username,
    password: userFormData.signup.password
  })
  if (result) {
    await router.push('/')
  }
}

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
              <form @submit.prevent="handleLogin" class="form auth__form">
                <div class="form__inputs">
                  <AppTextInput 
                    :value="userFormData.signin.username"
                    :label-binding-id="'auth-login'"
                    :input-type="'text'"
                    :label="'login'"
                    class="auth__input"
                    @input="v => userFormData.signin.username = v"
                  />
                  <AppTextInput 
                    :value="userFormData.signin.password"
                    :label-binding-id="'auth-password'"
                    :input-type="'password'"
                    :label="'password'"
                    class="auth__input"
                    @input="v => userFormData.signin.password = v" 
                  />
                </div>
                <AppButton type="submit">Procced</AppButton>
              </form>
            </keep-alive>
            <keep-alive v-else-if="currentFormType === AUTH_TYPES.SIGNUP">
              <form @submit.prevent="handleSignup" class="form auth__form">
                <div class="form__inputs">
                  <AppTextInput 
                    :value="userFormData.signup.username"
                    :label-binding-id="'auth-login'"
                    :input-type="'text'"
                    :label="'login'"
                    class="auth__input"
                    @input="v => userFormData.signup.username = v"
                  />
                  <AppTextInput
                    :value="userFormData.signup.password"
                    :label-binding-id="'auth-password'"
                    :input-type="'password'"
                    :label="'password'"
                    class="auth__input"
                    @input="v => userFormData.signup.password = v"
                  />
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
