import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout'


export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    hidden: true
  },
  {
    path: '/blog',
    component: () => import('@/views/blog'),
    hidden: true,
    meta: { requireAuth: true }
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
})

export default router