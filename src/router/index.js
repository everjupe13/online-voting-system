import { isReactive, reactive } from 'vue'
import store from '@/store/index.js'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const refStore = !isReactive(store) ? reactive(store) : store

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/AuthView.vue')
    }
  ]
})

router.beforeEach(async (to, from) => {
  if (refStore.getters['auth/isAuth'] && to.name === 'auth') {
    return { name: 'home' }
  }
})

export default router
