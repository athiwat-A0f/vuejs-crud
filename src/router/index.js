import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      component: () => import("../views/HomeView.vue")
    },
    {
      path: "/detail/:id",
      name: "detail",
      component: () => import("../views/HomeDetail.vue")
    },
    {
      path: "/admin/tutorials",
      name: "list",
      component: () => import("../views/TutorialsList.vue")
    },
    {
      path: "/admin/tutorials/:id",
      name: "edit",
      component: () => import("../views/Tutorial.vue")
    },
    {
      path: "/admin/add",
      name: "add",
      component: () => import("../views/AddTutorial.vue")
    }
  ]
})

export default router
