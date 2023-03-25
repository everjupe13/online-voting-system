<script setup>
import { RouterLink } from 'vue-router'
import AppLogo from './AppLogo.vue';
</script>

<template>
  <div class="app-main-aside">
    <div class="app-main-aside__top-row">
      <app-logo/>
    </div>
    <div class="app-main-aside__content">
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </nav>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-main-aside {
  padding: 0 15px;

  --header-height: 100px;
  --header-mb: 20px;

  &__top-row {
    display: flex;
    justify-content: center;
    align-items: center;

    height: var(--header-height, 100px);
    margin-bottom: var(--header-mb, 20px);
    padding: 10px 0;
  }

  &__content {
    height: calc(100% - var(--header-height, 100px) - var(--header-mb, 20px));
  }
}




nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}





nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}


</style>