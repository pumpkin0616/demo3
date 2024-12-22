import Vue from 'vue';
import VueRouter from 'vue-router';
import product from './modules/product';
import user from './modules/user';
import { routerBeforeEachFunc } from './interceptors';

Vue.use(VueRouter);

const routes = [
  {
    meta: {
      title: '首页' // 页面标题
    },
    path: '/',
    component: () => import('@/views/layout/IndexLayout.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        meta: {
          title: '首页' // 页面标题
        },
        component: () => import('@/views/home/HomeIndex.vue')
      },
      {
        path: '/about',
        name: 'about',
        meta: {
          title: '关于' // 页面标题
        },
        component: () => import('@/views/about/AboutIndex.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录' // 页面标题
    },
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
router.beforeEach(routerBeforeEachFunc);
export default router;
