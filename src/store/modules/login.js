import { userLogin, userLogout } from "@/api/login";
import { setToken, removeToken, removeUsername, setUsername, getUsername } from "@/utils/app";

const state = {
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
    token: '',
    username: getUsername() || ''
};

const getters = {
    isCollapse: state => state.isCollapse,

};

const mutations = { //同步，不需要回调处理事务
    SET_COLLAPSE(state) {
        state.isCollapse = !state.isCollapse;
        //html5本地存储
        sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse));  //sessionStorage是临时性,localStorage是长期性
    },
    SET_TOKEN(state, value) {
        state.token = value;
    },
    SET_USERNAME(state, value) {
        state.username = value;
    },
};

const actions = { //支持同步和异步，可以回调处理事务
    // setMenuStatus(content, data) {  //content = { getters, state, rootState, rootGetters, dispatch, commit }
    //     content.commit('SET_COLLAPSE');
    // }

    login({ commit }, requestData) {
         return new Promise((resolve, reject) => {
             // 调用api/login.js里的接口
             userLogin(requestData).then(response => {
                 let data = response.data.data;
                 // 修改state
                 commit('SET_TOKEN', data.token);
                 commit('SET_USERNAME', data.username);
                 // 存储到cookie中
                 setToken(data.token);
                 setUsername(data.username);
                 resolve(response);
            }).catch(error => {
                reject(error);
            });
         })
    },

    logout({ commit }) {
        return new Promise((resolve, reject) => {

            // userLogout().then(response => { //userLogout后台接口有问题
            //     const data = response.data;
            //     // 删除cookie和store中的变量
            //     removeToken();
            //     removeUsername();
            //     commit('SET_TOKEN', '');
            //     commit('SET_USERNAME', '');
            //     resolve(data);
            // }).catch(error => {
            //     reject(error);
            // })

            resolve({
                resCode: 0,
            })

        })

    }
};

export default {
    namespaced: true,   //不同modules里可以有相同的变量名
    state,
    getters,
    mutations,
    actions
}