import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Lazy loading des composants
const LoginPage = () => import('@/pages/LoginPage.vue')
const TodoDashboard = () => import('@/pages/TodoDashboard.vue')
const RegisterPage = () => import('@/pages/RegisterPage.vue')
const ForgotPasswordPage = () => import('@/pages/ForgotPasswordPage.vue')
const ResetPasswordPage = () => import('@/pages/ResetPasswordPage.vue')

const routes = [
  {
    path: '/',
    redirect: () => '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    meta: { requiresAuth: false },
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage,
    meta: { requiresAuth: false },
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: ForgotPasswordPage,
    meta: { requiresAuth: false },
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: ResetPasswordPage,
    meta: { requiresAuth: false },
  },
  {
    path: '/todo-dashboard',
    name: 'todo-dashboard',
    component: TodoDashboard,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // Vérifier l'authentification si ce n'est pas déjà fait
  if (!authStore.isAuthenticated) {
    await authStore.checkAuth()
  }

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.path === '/login' && authStore.isAuthenticated) {
    next('/todo-dashboard')
  } else {
    next()
  }
})

export default router
