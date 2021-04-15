import axios from 'axios';
import { ElMessage } from 'element-plus';
import { getToken, getUsername } from '@/utils/app';

// 创建service
// 给定API，地址 http://www.web-jshtml.cn/productApi
const BASEURL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API : process.env.VUE_APP_API;
const service = axios.create({
    baseURL: BASEURL,  // http://192.168.0.106:8080/devApi/  == http://www.web-jshtml.cn/productapi/productapi
    timeout: 5000,
});

// 添加请求拦截器
service.interceptors.request.use(config => {
    //在发送请求之前做些什么
    //处理业务需求

    //根据后端需要，在请求头添加参数
    config.headers['Token'] = getToken();
    config.headers['UserName'] = getUsername();
    return config;
}, err => {
    //处理请求错误
    return Promise.reject(err);
});

// 添加响应拦截器
service.interceptors.response.use(response => {
    //处理响应数据
    let data = response.data;

    if(data.resCode !== 0) {
        ElMessage.error(data.message);  //后台返回报错信息
        return Promise.reject(data);
    }
    else {
        return response;
    }

}, err => {
    //处理响应错误
    return Promise.reject(err);
});

export default service;