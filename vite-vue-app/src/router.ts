import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import LayoutTab from './components/LayoutTab.vue';


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/puttIQ',
    component: LayoutTab,
    children: [
      {
        path: '',
        redirect: 'home',
      },
      {
        path: 'home',
        component: () => import('./views/HomePage.vue'),
      },
      {
        path: 'connect',
        component: () => import('./views/ConnectPage.vue'),
      },
      {
        path: 'search',
        component: () => import('./views/SearchPage.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('./views/LoginPage.vue'),
  },
  {
    path: '/register',
    component: () => import('./views/RegisterPage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;