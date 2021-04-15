import service from '@/utils/request';

/**
 * 获取验证码
 */
export function getSms(data) {
    return service.request({
        method: "post",
        url: "/getSms/",
        data        //简写，相当于 data: data,
    })
}

/**
 * 获取用户角色
 */


/**
 * 登录
 */
export function userLogin(data) {
    return service.request({
        method: "post",
        url: "/login/",
        data
    })
}

/**
 * 登出
 */
export function userLogout(data = {}) {
    return service.request({
        method: "post",
        url: "/logout/",
        data
    })
}

/**
 * 注册
 */
export function userRegister(data) {
    return service.request({
        method: "post",
        url: "/register/",
        data
    })
}