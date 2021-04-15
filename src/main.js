import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

// 引入路由守卫
import "./router/permission";

// 引入自定义的全局组件，默认引入index.js文件
import './icons/index';
import svgIcon from "./icons/svgIcon";

const app = createApp(App);

app.component('svg-icon', svgIcon);

app.use(ElementPlus);
app.use(store).use(router);
app.mount("#app");
