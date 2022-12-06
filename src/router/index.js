import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '../views/layout/Main.vue';
import PageNotFound from '../views/layout/PageNotFound.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Main,
  },
  {
    path: '/movie/:id',
    name: 'showMovie',
    component: () => import('../components/Movie.vue'),
  },
  {
    path: '/keyword/:keyword',
    name: 'keyword',
    component: () => import('../components/Keyword.vue'),
  },
  {
    path: '*',
    name: 'pageNotFound',
    component: PageNotFound,
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
