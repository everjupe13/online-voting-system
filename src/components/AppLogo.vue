<script setup>
import { RouterLink } from 'vue-router'
// import { useRouter } from 'vue-router'

// const router = useRouter()

</script>

<template>

  <RouterLink to="/" class="logo">
    <span class="logo__glass">
      <img alt="online" class="logo__img" src="@/assets/img/check-mark.png" style="filter: grayscale(1)">
    </span>
  </RouterLink>
</template>

<style lang="scss">
.logo {
  display: block;

  height: 100%;

  &__glass {
    display: block;
    height: 100%;
  }

  &__img {
    display: block;
    height: 100%;
  }
}
</style>
