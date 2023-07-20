import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProductsView from '@/views/ProductsView.vue'
import ProductView from '@/views/ProductView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/products',
      name: 'products',
      component: ProductsView
    },
    {
      path: '/products/:id',
      name: 'product',
      component: ProductView
    },
    {
      path: '/:catchAll(.*)*',
      redirect: {name: 'home'},
    }
  ],
  linkExactActiveClass: 'underline underline-offset-8'
})

export default router
