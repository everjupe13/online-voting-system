<script setup>
import { RouterView } from 'vue-router'
import LayoutDefault from '@/layouts/LayoutDefault.vue'
import AppMainAside from '@/layouts/AppMainAside.vue'

import { useStore } from 'vuex'


const store = useStore()
store.dispatch('auth/setupUserSession')
</script>

<template>
  <Suspense>
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
  </Suspense>
</template>
