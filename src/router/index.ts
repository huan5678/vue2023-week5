import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import DashboardViewVue from '@/views/DashboardView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView as any,
      meta: {
        title: 'Home',
      },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardViewVue as any,
      meta: {
        title: 'Dashboard',
      },
    },
  ],
});

router.beforeEach((to, _from, next) => {
  document.title = `${to.meta.title}`;
  next();
});

export default router;
