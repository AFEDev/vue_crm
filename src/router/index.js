import { createRouter, createWebHistory } from 'vue-router';
import { getAuth } from 'firebase/auth'
import record from '@/store/record';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes:[
    {
      path: '/login',
      name: 'login',
      meta: { layout: 'empty' },
      component: () => import('../views/LoginModal.vue'),
    },
    {
      path: '/register',
      name: 'register',
      meta: {layout: 'empty'},
      component: () => import('../views/RegisterModal.vue')
    },
    {
      path: '/',
      name: 'home',
      meta: { layout: 'main', auth:true },
      component: () => import ('../views/HomeView.vue')
    },
    {
      path: '/categories',
      name: 'categories',
      meta: { layout: 'main', auth:true },
      component: () => import('../views/CategoriesView.vue'),
    },
    {
      path: '/history',
      name: 'history',
      meta: { layout: 'main', auth:true},
      component: () => import('../views/HistoryView.vue'),
    },
    {
      path: '/detail/:id',
      name: 'detail',
      meta: { layout: 'main', auth:true },
      component: () => import('../views/DetailRecordView.vue'),
    },
    {
      path: '/planing',
      name: 'planing',
      meta: {layout: 'main', auth:true},
      component: () => import('../views/PlanningView.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      meta: {layout: 'main', auth:true},
      component: () => import('../views/ProfileView.vue'),
    },
    {
      path: '/record',
      name: 'record',
      meta: {layout: 'main', auth:true},
      component: () => import('../views/RecordView.vue'),
    },
  ],
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  const currentUser = getAuth().currentUser
  const requredAuth = to.matched.some(record => record.meta.auth)

  if (requredAuth && !currentUser) {
    next('/login?message=login')
  } else {
    next()
  }
})

export default router;
