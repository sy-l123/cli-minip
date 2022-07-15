import { RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      isKeepAlive: true,
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

export default routes;
