import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/equipment',
      name: 'equipment',
      component: () => import('../views/EquipmentView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/equipment/add',
      name: 'equipment-add',
      component: () => import('../views/EquipmentFormView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/equipment/edit/:id',
      name: 'equipment-edit',
      component: () => import('../views/EquipmentFormView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/distribution',
      name: 'distribution',
      component: () => import('../views/DistributionView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/reports',
      name: 'reports',
      component: () => import('../views/ReportsView.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
