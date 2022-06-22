import { createRouter, createWebHistory } from "vue-router";
import { getAuth } from "firebase/auth";
import filters from "@/filters/filters";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      meta: { title: "Login", title: "Home Page - Example App", layout: "empty" },
      component: () => import("../views/LoginModal.vue"),
    },
    {
      path: "/register",
      name: "register",
      meta: { title: "Register", layout: "empty" },
      component: () => import("../views/RegisterModal.vue"),
    },
    {
      path: "/",
      name: "home",
      meta: { title: "Balance", layout: "main", auth: true },
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/categories",
      name: "categories",
      meta: { title: "Categories", layout: "main", auth: true },
      component: () => import("../views/CategoriesView.vue"),
    },
    {
      path: "/history",
      name: "history",
      meta: { title: "History", layout: "main", auth: true },
      component: () => import("../views/HistoryView.vue"),
    },
    {
      path: "/detail/:id",
      name: "detail",
      meta: { title: "Details", layout: "main", auth: true },
      component: () => import("../views/DetailRecordView.vue"),
    },
    {
      path: "/planing",
      name: "planing",
      meta: { title: "Planing", layout: "main", auth: true },
      component: () => import("../views/PlanningView.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      meta: { title: filters.localizeFilter("ProfileTitle"), layout: "main", auth: true },
      component: () => import("../views/ProfileView.vue"),
    },
    {
      path: "/record",
      name: "record",
      meta: { title: "Record", layout: "main", auth: true },
      component: () => import("../views/RecordView.vue"),
    },
  ],
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  const currentUser = getAuth().currentUser;
  const requredAuth = to.matched.some((record) => record.meta.auth);

  if (requredAuth && !currentUser) {
    next("/login?message=login");
  } else {
    // window.document.title = to.meta && to.meta.title ? to.meta.title + " | CRM" : "Home";
    next();
  }
});

export default router;
