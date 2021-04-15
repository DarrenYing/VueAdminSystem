import router from "./index";
import store from "../store/index";
import { getToken, removeToken, removeUsername } from "@/utils/app";

// 路由白名单
const routerWhiteList = ['/login'];

// 路由守卫
router.beforeEach((to, from, next) => {
    if(getToken()) {
        if(to.path === '/login'){   //用户主动回到login界面，则视为登出，清除cookie
            removeToken();
            removeUsername();
            store.commit("app/SET_TOKEN", '');
            store.commit("app/SET_USERNAME", '');
            next();
        }
        else {
            next();
        }
    }
    else {
        /**
         * 如果用户无token，直接访问index页面，出发路由守卫，跳转向login，
         * 然后再次触发路由守卫，由于'/login'在白名单中，就会直接跳转，不会导致死循环
         */
        if(routerWhiteList.indexOf(to.path) !== -1) {
            next(); //在白名单内，直接跳转
        }
        else {
            next('/login'); //跳转到登录界面
        }
    }
})