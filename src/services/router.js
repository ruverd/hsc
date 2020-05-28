import Vue from "vue";
import VueRouter from "vue-router";
import routes from "../routes/routes";

Vue.use(VueRouter);

// configure router
const router = new VueRouter({
  mode: 'history',
  routes, // short for routes: routes
  linkActiveClass: "active",
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/login", "/register"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = sessionStorage.getItem("access_token");

  if (authRequired && !loggedIn) {
    return next("/login");
  }

  if (loggedIn && !authRequired) {
    return next("/dashboard");
  }

  next();
});

export default router;
