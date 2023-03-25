<script setup>

const props = defineProps({
  tag: {
    type: String,
    default: 'h1'
  }
})
</script>

<template>
  <h1 v-if="props.tag === 'h1'" class="title">
    <slot>
      {{ props.type }}
    </slot>
  </h1>
  <h2 v-if="props.tag === 'h2'" class="title">
    <slot>
      {{ props.type }}
    </slot>
  </h2>
  <h3 v-if="props.tag === 'h3'" class="title">
    <slot>
      {{ props.type }}
    </slot>
  </h3>
  <h4 v-if="props.tag === 'h4'" class="title">
    <slot>
      {{ props.type }}
    </slot>
  </h4>
  <h5 v-if="props.tag === 'h4'" class="title">
    <slot>
      {{ props.type }}
    </slot>
  </h5>
  <h6 v-if="props.tag === 'h4'" class="title">
    <slot>
      {{ props.type }}
    </slot>
  </h6>
</template>

<style lang="scss">
.title {
  font-weight: 900;
  font-size: 52px;
  margin: 0;
}
</style>