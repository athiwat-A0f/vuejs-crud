import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      alias: "/tutorials",
      name: "tutorials",
      component: () => import("../views/TutorialsList.vue")
    },
    {
      path: "/tutorials/:id",
      name: "tutorial-details",
      component: () => import("../views/Tutorial.vue")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("../views/AddTutorial.vue")
    }
  ]
})

export default router
