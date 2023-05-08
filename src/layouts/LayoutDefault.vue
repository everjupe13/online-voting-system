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

  column-gap: var(--layout-default-gap);
    
  width: 100%;
  height: 100%;

  --layout-default-aside-width: 250px;
  --layout-default-gap: 50px;

  &__aside {
    flex: 0 0 auto;

    width: var(--layout-default-aside-width);
    height: 100%;
  }

  &__main {
    flex: 1 1 auto;
    
    width: calc(100% - var(--layout-default-aside-width) - var(--layout-default-gap));
  }
}
</style>