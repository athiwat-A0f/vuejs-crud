import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import Profile from '@/components/Profile.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
    },
    {
      path: "/",
      name: "home",
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
      component: () => import("../views/EditTutorial.vue")
    },
    {
      path: "/admin/add",
      name: "add",
      component: () => import("../views/AddTutorial.vue")
    },
    // {
    //   path: "/:pathMatch(.*)*",
    //   name: "not-found",
    //   component: () => import("../views/NotFound.vue"),
    // },
  ]
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/profile', '/login', '/register', '/'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  const role = (loggedIn) ? JSON.parse(loggedIn).roles.includes('ROLE_ADMIN') : false;
  // trying to access a restricted page + not logged in
  // redirect to login page
  // console.log(authRequired, loggedIn, !role)
  if (authRequired && !role) {
    next({ name: 'home' });
  } else {
    next();
  }
});

export default router
