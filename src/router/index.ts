import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OrdersPage from '@/views/OrdersView.vue'
import StocksView from '@/views/StocksView.vue'
import SalesView from '@/views/SalesView.vue'
import IncomesView from '@/views/IncomesView.vue'
import DetailView from '@/views/DetailView.vue'

// import MarkPriceSaleView from '@/views/MarkPriceSaleView.vue'
import MarkCountSalesView from '@/views/MarkCountSalesView.vue'
// import MarkDiscountPercentView from '@/views/MarkDiscountPercentView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/orders',
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
      path: '/mark/pricesale',
      name: 'mark price sale',
      component: MarkCountSalesView,
    },

    {
      path: '/mark/countsales',
      name: 'mark count sales',
      component: MarkCountSalesView,
    },
    {
      path: '/mark/countcancel',
      name: 'mark count cancel',
      component: MarkCountSalesView,
    },
    {
      path: '/mark/discountpercent',
      name: 'mark discount percent',
      component: MarkCountSalesView,
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: DetailView,
      props: true,
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
