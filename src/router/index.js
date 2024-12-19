import Vue from 'vue';
import VueRouter from 'vue-router';
import product from './modules/product';
import user from './modules/user';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('@/views/layout/IndexLayout.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/home/HomeIndex.vue')
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('@/views/about/AboutIndex.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/IndexLogin.vue')
  },
  ...product,
  ...user
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
