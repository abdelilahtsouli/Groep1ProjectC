import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Bloedprikken from '../views/Bloedprikken.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/', redirect : '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/bloedprikken',
    name: 'Bloedprikken',
    component: Bloedprikken
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
