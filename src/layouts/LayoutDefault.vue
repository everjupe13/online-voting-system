<script setup>

</script>

<template>
  <div class="layout-default">
    <aside class="layout-default__aside">
      <slot name="menu"></slot>
    </aside>
    
    <main class="layout-default__main">
      <slot name="content"></slot>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.layout-default {
  display: flex;

  column-gap: var(--layout-default-gap, 50px);
    
  width: 100%;
  height: 100%;

  &__aside {
    flex: 0 0 auto;

    width: var(--layout-default-aside-width, 300px);
    height: 100%;
  }

  &__main {
    flex: 1 1 auto;
    
    width: calc(100% - var(--layout-default-aside-width, 300px) - var(--layout-default-gap, 50px));
  }
}
</style>