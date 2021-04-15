import { createApp } from "vue";        //这种方式适合vue2.0 即import Vue from "vue"
                                        // Vue.component('component-name', template)    //全局注册
// import svgIcon from "./svgIcon";

// const app2 = createApp({});
// // app.component('svg-icon', svgIcon);
//
//
// app2.component('svg-icon', {
//     template: "<div>{{ msg }}</div>",
//     data(){
//         return {
//             msg: 'test'
//         }
//     }
// });

const req = require.context('./svg', false, /\.svg$/); // 获取当前svg目录所有为.svg结尾的文件
const requireAll = (requireContext) => {
    console.log(requireContext.keys().map(requireContext));
    return requireContext.keys().map(requireContext);  // 解析获取的.svg文件的文件名称，并返回
};
requireAll(req);