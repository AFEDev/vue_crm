import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes:[
    {
      path: '/',
      name: 'home',
      meta: { layout: 'main' },
      component: () => import ('../views/HomeView.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: { layout: 'empty' },
      component: () => import('../views/LoginModal.vue'),
    },
    {
      path: '/categories',
      name: 'categories',
      meta: { layout: 'main' },
      component: () => import('../views/CategoriesView.vue'),
    },
    {
      path: '/history',
      name: 'history',
      meta: { layout: 'main'},
      component: () => import('../views/HistoryView.vue'),
    },
    {
      path: '/detail-record',
      name: 'detail-record',
      meta: { layout: 'main' },
      component: () => import('../views/DetailRecordView.vue'),
    },
    {
      path: '/planing',
      name: 'planing',
      meta: {layout: 'main'},
      component: () => import('../views/PlanningView.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      meta: {layout: 'main'},
      component: () => import('../views/ProfileView.vue'),
    },
    {
      path: '/record',
      name: 'record',
      meta: {layout: 'main'},
      component: () => import('../views/RecordView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      meta: {layout: 'empty'},
      component: () => import('../views/RegisterModal.vue')
    },
  ],
  linkActiveClass: "active",
});

export default router;
