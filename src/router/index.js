import { isReactive, reactive } from 'vue'
import store from '@/store/index.js'
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'

const refStore = !isReactive(store) ? reactive(store) : store

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/pages/AboutPage.vue')
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/pages/AuthPage.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/pages/ProfilePage.vue')
    },
    {
      path: '/topic/:id',
      name: 'topic',
      component: () => import('@/pages/TopicPage.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/pages/404Page.vue')
    }
  ]
})

router.beforeEach(async (to, from) => {
  if (refStore.getters['auth/isAuth'] && to.name === 'auth') {
    return { name: 'home' }
  }
})

export default router
