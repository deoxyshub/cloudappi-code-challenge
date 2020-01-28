import Home from "./views/Home.vue";

export const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./views/About.vue")
  },
  {
    path: "/user/:userId?",
    name: "user",
    component: () => import("./views/User.vue")
  }
];
