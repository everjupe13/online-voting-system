<script setup>
import { RouterLink } from 'vue-router'
// import { useRouter } from 'vue-router'

// const router = useRouter()

</script>

<template>

  <RouterLink to="/" class="logo">
    <span class="logo__glass">
      <img alt="online" class="logo__img" src="@/assets/img/logo.svg">
    </span>
  </RouterLink>
</template>

<style lang="scss">
.logo {
  display: block;

  width: 50px;
  height: 50px;

  &__glass {
    display: block;
    width: 100%;
    height: 100px;
  }

  &__img {
    display: block;
    width: 100%;
  }
}
</style>
