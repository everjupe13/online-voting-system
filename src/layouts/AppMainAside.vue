<script setup>
import { RouterLink } from 'vue-router'
import { ref, onMounted } from 'vue'
import AppLogo from '@/components/AppLogo.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const bodyRef = ref(null)
const router = useRouter()

onMounted(() => {
  bodyRef.value = document.querySelector('body')
})

const changeTheme = () => {
  const cl = bodyRef.value.classList
  if (cl.contains('dark')) {
    cl.remove('dark')
    cl.add('light')
  } else {
    cl.remove('light')
    cl.add('dark')
  }
}

const logout = async () => {
  store.dispatch('auth/logout')
  await router.push('/auth')
}
</script>

<template>
  <div class="app-main-aside">
    <div class="app-main-aside__top-row">
      <div class="app-main-aside__control-panel">
        <button @click.prevent="changeTheme" class="app-main-aside__control-panel__item">
          <svg class="app-main-aside__contol-panel__icon" width="483" height="511" viewBox="0 0 483 511" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M449.851 323.011C471.909 316.366 490.794 340.714 478.786 360.429C408.318 476.133 313.685 517.112 226.908 509.72C141.796 502.471 66.72 448.658 34.8209 380.133C7.31907 321.055 -12.6502 242.102 9.93726 168.899C33.1185 93.7721 99.1286 30.6321 230.734 0.744828C252.271 -4.14606 270.191 19.8682 257.604 39.2081C247.196 55.1992 228.06 88.3792 218.12 128.692C208.221 168.838 207.755 214.553 232.34 257.81C261.462 309.049 304.692 328.153 346.535 333.296C389.206 338.54 429.835 329.041 449.851 323.011ZM424.058 370.142C400.921 374.206 371.975 376.723 341.655 372.997C290.208 366.674 234.275 342.167 197.565 277.575C166.365 222.679 167.809 165.651 179.283 119.116C186.025 91.773 196.337 67.5345 206.056 48.5729C107.903 78.2496 64.2318 128.603 48.1591 180.693C29.7668 240.3 45.4909 308.274 71.0842 363.252C96.7184 418.318 158.954 463.787 230.302 469.865C292.678 475.178 364.103 450.375 424.058 370.142Z"
              fill="currentColor" />
          </svg>
          <!-- <img src="@/assets/img/sleep-mode.png" alt="" class="app-main-aside__contol-panel__icon">/ -->
        </button>
        <button 
          v-if="store.getters['auth/isAuth']"
          class="logout-button"
          @click.prevent="logout"
        >Logout</button>
      </div>
      <div class="app-main-aside__title-row">
        <app-logo class="app-main-aside__logo" />
        <h2 class="app-main-aside__title">be voted</h2>
      </div>
    </div>
    <div class="app-main-aside__content">
      <nav>
        <RouterLink active-class="--active" to="/">Home</RouterLink>
        <RouterLink active-class="--active" to="/about">About</RouterLink>
        <RouterLink v-if="!store.getters['auth/isAuth']" active-class="--active" to="/auth">Auth</RouterLink>
        <RouterLink v-if="store.getters['auth/isAuth']" active-class="--active" to="/profile">Profile</RouterLink>
      </nav>
      <p style="text-align: center; margin-top: auto">v0.0.1 <br><small>educational project for the university</small></p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/scss/mixins.scss';

.app-main-aside {
  padding: 0 0;
  height: 100%;

  --header-height: 100px;
  --header-mb: 10px;
  --header-top-offset: 30px;

  &__logo {
    height: 40px;
  }

  &__top-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;

    height: calc(var(--header-height, 100px) + var(--header-top-offset, 20px));
    margin-bottom: var(--header-mb, 20px);

    padding: 10px 0;
  }

  &__title-row {
    display: flex;
    align-items: center;
    column-gap: 15px
  }

  &__title {
    font-family: var(--ff-heading);
    font-weight: 200;
    font-size: 28px;
    letter-spacing: 1.2px;

    text-shadow: 3px 2px 3px rgba(102, 102, 102, 0.22);
  }

  &__control-panel {
    display: flex;
    justify-content: flex-start;

    width: 100%;
    height: 30px;
    margin-bottom: var(--header-top-offset, 20px);
  }

  &__control-panel__item {
    display: flex;
    justify-content: center;
    align-items: center;

    width: max-content;
    height: 100%;
    padding: 5px;
    border: 0;

    background: transparent;
    outline: none;
  }

  &__contol-panel__icon {
    height: 26px;
    width: 26px;

    transition: .2s all;

    &:hover {
      transform: scale(1.07);
    }

    &:active {
      transform: scale(0.85) translateY(2px);
    }

    path {
      transition: inherit;
      fill: var(--color-text);
    }
  }

  &__content {
    display: flex;
    flex-direction: column;

    height: calc(100% - calc(var(--header-height, 100px) + var(--header-top-offset, 20px)) - var(--header-mb, 20px));
    padding-top: 20px;

    font-size: 12px;
  }
}


.logout-button {
  display: block;
  margin-left: auto;
  border: 0;
  background-color: transparent;

  font-family: var(--ff-menlo);
  color: inherit;
  text-underline-offset: 5px;

  transition: 0.15s all linear;
  text-decoration: underline;

  &:hover {
    @include link-gradient()
  }
}

nav {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  column-gap: 16px;

  width: 100%;
  font-size: 14px;
  text-align: center;
}

nav a.--active {
  @include link-gradient()
}
</style>