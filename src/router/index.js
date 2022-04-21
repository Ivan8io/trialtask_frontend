import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Tariffs",
    meta: { requiresAuth: true },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Tariffs.vue"),
  },
  {
    path: "/login",
    name: "Login",
    meta: { requiresVisitor: true },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: "/pump-meters",
    name: "PumpMeters",
    meta: { requiresAuth: true },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/PumpMeters.vue"),
  },
  {
    path: "/residents",
    name: "Residents",
    meta: { requiresAuth: true },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Residents.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
