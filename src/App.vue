<script setup>
import { RouterView } from 'vue-router'
import LayoutDefault from './components/LayoutDefault.vue';
import AppMainAside from './components/AppMainAside.vue';
</script>

<template>
  <layout-default>

    <!-- MainAside element / Navigation and Controling -->
    <template #menu>
      <app-main-aside />
    </template>

    <!-- Content box -->
    <template #content>
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </template>

  </layout-default>
</template>
