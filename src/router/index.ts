import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import OrdersPage from '@/views/OrdersView.vue'
import StocksView from '@/views/StocksView.vue'
import SalesView from '@/views/SalesView.vue'
import IncomesView from '@/views/IncomesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'orders',
      component: OrdersPage,
    },
    {
      path: '/stocks',
      name: 'stocks',
      component: StocksView,
    },
    {
      path: '/incomes',
      name: 'incomes',
      component: IncomesView,
    },
    {
      path: '/sales',
      name: 'sales',
      component: SalesView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
