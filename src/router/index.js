import { createRouter, createWebHistory } from 'vue-router';
import Cards from '../components/Cards.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Cards,
    props: { type: 'selected' }
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: Cards,
    props: { type: 'favorites' }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
