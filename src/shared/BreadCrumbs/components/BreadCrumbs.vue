<script setup>
const props = defineProps({
  crumbs: {
    type: Array,
    default: () => ([
      {
        link: '/',
        name: 'Home'
      }
    ])
  }
})

const isLastCrumb = (index) => {
  return index === props.crumbs.length - 1
}

const determineCrumbsComponent = (index) => {
  return !isLastCrumb(index) && props.crumbs.length !== 1 ? 'router-link' : 'span'
}
</script>

<template>
  <span class="bread-crumbs">
    <span
      v-for="(crumb, index) in props.crumbs"
      :key="crumbs.name"
      class="bread-crumbs__item"
    >
      <component 
        :is='determineCrumbsComponent(index)'
        :to="!isLastCrumb(index) ? crumb?.link : ''"
        :class="['app-link', { 'app-link_pured': isLastCrumb(index) }]"
      >
        {{ crumb.name }}
      </component>
      <span v-if="!isLastCrumb(index)" class="app-link_pured">{{ ' / ' }}</span>
    </span>
  </span>
</template>

<style lang="scss" scoped>
</style>