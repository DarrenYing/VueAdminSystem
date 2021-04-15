import { createRouter, createWebHashHistory } from "vue-router";


//引入布局组件
import Layout from '@/views/Layout';  //如果该目录下有index.vue，就可以省略/index

const routes = [
  {
    path: "/",
    redirect: "login",
    meta: {
      name: "默认路由",
      hidden: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login/index"),
    meta: {
      name: "登录页",
      hidden: true,
    },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    redirect: "index",
    meta: {
      name: "控制台",
      icon: "console"
    },
    component: Layout,
    children: [
      {
        path: "/index",
        name: "Index",
        meta: {
          name: "首页",
          hidden: true,
        },
        component: () => import("../views/Dashboard/index"),
      }
    ]
  },
  {
    path: "/info",
    name: "Info",
    meta: {
      name: "信息管理",
      icon: "info"
    },
    component: Layout,
    children: [
      {
        path: "/infoIndex",
        name: "infoIndex",
        meta: {
          name: "信息管理",
          hidden: true,
        },
        component: () => import("../views/Info/index"),
      },
      {
        path: "/infoCategory",
        name: "infoCategory",
        meta: {
          name: "信息分类",
          hidden: true,
        },
        component: () => import("../views/Info/infoCategory"),
      }
    ]
  },

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
