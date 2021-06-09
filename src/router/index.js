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
  },
  {
    path: '/user',
    component: () => import('@/views/user'),
    hidden: true
  },
  {
    path: '/redirect-silentrenew',
    component: () => import('@/views/login'),
    hidden: true
  },
  {
    path: '/signin-oidc',
    component: () => import('@/components/signin-oidc'),
    hidden: true
  },
  {
    path: '/signin-redict',
    component: () => import('@/components/signin-redict'),
    hidden: true
  },
  {
    path: '/CallBack',
    component: () => import('@/views/login'),
    hidden: true
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
})

export default router