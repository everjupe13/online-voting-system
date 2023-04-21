<script setup>

const props = defineProps({
  onClick: {
    type: Function,
    default: () => {}
  }
})
</script>

<template>
  <button
    class="btn"
    @click="props.onClick"
  >
    <slot></slot>
  </button>
</template>

<style lang="scss">
.btn {
  display: flex;
  justify-content: center;

  position: relative;

  padding: 11px 21px;
  border: none;

  background: var(--link-gradient-2);
  background-color: var(--c-accent-2);

  font-weight: bold;
  font-family: var(--ff-menlo);
  color: #fff;

  transition: .2s all;

  &:active {
    transform: translateY(3px);
  }
}
</style>